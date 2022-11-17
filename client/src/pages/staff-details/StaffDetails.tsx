import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Typography,
  Alert,
  LinearProgress,
  Dialog,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { updateStaff, useRoleList, useStaff } from '../../data';
import SaveBar from '../../components/save-bar/save-bar';
import { Gender, StaffUpdateData } from '../../types';
import { EMAIL_REGEXP } from '../../utils';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import ResetStaffPasswordDialog from './ResetStaffPasswordDialog';
import { cleanStaffForUpdate } from './utils';
import { GenderSelect, usePermission } from '../../components';

export default function StaffDetailsPage() {
  const { id } = useParams();
  const { canWrite } = usePermission();
  if (!id) {
    return (
      <Container>
        <Alert severity="error">Staff ID is not defined</Alert>
      </Container>
    );
  }
  const { data, isLoading } = useStaff(id);
  const { data: roleListData } = useRoleList();
  const queryClient = useQueryClient();
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const { control, reset, handleSubmit, watch } = useForm<StaffUpdateData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: Gender.NOT_SPECIFIED,
      roleIds: [],
    },
  });
  const updateStaffAndMutate = useMutation(updateStaff, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['staff', id]);
      setIsSaveOpen(false);
      setIsSavingChanges(false);
    },
  });

  useEffect(() => {
    if (data) {
      reset(cleanStaffForUpdate(data));
    }
    const subscription = watch(() => setIsSaveOpen(true));
    return () => subscription.unsubscribe();
  }, [data, watch]);

  const saveChanges = (values: StaffUpdateData) => {
    updateStaffAndMutate.mutate({
      id,
      data: values,
    });
    setIsSavingChanges(true);
  };

  return (
    <>
      <Container>
        {data && (
          <Dialog
            open={data && isResetDialogOpen}
            onClose={() => setIsResetDialogOpen(false)}
          >
            <ResetStaffPasswordDialog
              staff={data}
              handleClose={() => setIsResetDialogOpen(false)}
            />
          </Dialog>
        )}
        {isLoading && <LinearProgress />}
        {data && (
          <>
            <PageHeader
              pageTitle={`${data.firstName} ${data.lastName}`}
              backURL="/staff"
            />
            <Spacer size="lg" />
            {data.isSuspended && (
              <>
                <Alert severity="warning">
                  This staff is suspended and no longer has access to the
                  system, unsuspend the staff to grant access again.
                </Alert>
                <Spacer size="md" />
              </>
            )}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  About {data.firstName} {data.lastName}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormInputField
                      control={control}
                      name="firstName"
                      label="First name"
                      rules={{ required: true, minLength: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInputField
                      control={control}
                      name="lastName"
                      label="Last name"
                      rules={{ required: true, minLength: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputField
                      control={control}
                      name="email"
                      label="Email"
                      rules={{
                        required: true,
                        minLength: 1,
                        pattern: EMAIL_REGEXP,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      data-testid="btn-reset-password"
                      onClick={() => setIsResetDialogOpen(true)}
                      disabled={!canWrite}
                    >
                      Reset Password
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <GenderSelect
                      control={control}
                      name="gender"
                      rules={{ required: true }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                {/* TODO integrate this as a follow up */}
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Permissions
                </Typography>
                <Controller
                  name="roleIds"
                  control={control}
                  rules={{ minLength: 1 }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <FormControl fullWidth>
                      <InputLabel id="roleLabel">Roles</InputLabel>
                      <Select
                        labelId="roleLabel"
                        value={value}
                        onChange={onChange}
                        label="Roles"
                        error={invalid}
                        disabled={!canWrite}
                        multiple
                      >
                        {roleListData &&
                          roleListData.map((r) => (
                            <MenuItem key={r.id} value={r.id}>
                              {r.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
                  Danger Zone
                </Typography>
                {data.isSuperUser && (
                  <>
                    <Alert severity="warning">
                      You cannot delete the super user.
                    </Alert>
                    <Spacer />
                    <Alert severity="info">
                      To improve your application security, we recommend that
                      you suspend the super user. The super user can bypass all
                      permission checks (including IP check) and access all
                      parts of the application. Before you suspend this account
                      make sure your other accounts have adequate security
                      permissions set up.
                    </Alert>
                    <Spacer />
                  </>
                )}
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography variant="h6">Suspend staff</Typography>
                    <Typography variant="body2">
                      Suspending a staff will suspend the user&apos;s ability to
                      access the app.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant="text"
                      color="error"
                      data-testid="btn-toggle-staff-suspension"
                      disabled={!canWrite}
                      onClick={() =>
                        saveChanges({
                          ...cleanStaffForUpdate(data),
                          isSuspended: !data.isSuspended,
                        })
                      }
                    >
                      {data.isSuspended ? 'Unsuspend' : 'Suspend'}
                    </Button>
                  </Grid>
                  {!data.isSuperUser && (
                    <>
                      <Grid item xs={10}>
                        <Typography variant="h6">Delete staff</Typography>
                        <Typography variant="body2">
                          Delete this staff from your team. You must suspend the
                          staff first.
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          variant="text"
                          color="error"
                          disabled={!data.isSuspended || !canWrite}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
      <SaveBar
        open={isSaveOpen}
        onSave={handleSubmit(saveChanges)}
        loading={isSavingChanges}
      />
      <Spacer size="lg" />
    </>
  );
}
