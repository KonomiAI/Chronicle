import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  LinearProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { updateStaff, useRoleList, useStaff } from '../../data';
import SaveBar from '../../components/save-bar/save-bar';
import { Gender, Staff, StaffUpdateData } from '../../types';
import { EMAIL_REGEXP, getFormErrorMessage } from '../../utils';

const cleanStaff = (staff: Staff) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, roles, ...clean } = staff;
  return clean;
};

export default function StaffDetailsPage() {
  const { id } = useParams();
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
    onSuccess: () => {
      queryClient.invalidateQueries(['staff', id]);
      setIsSaveOpen(false);
      setIsSavingChanges(false);
    },
  });

  useEffect(() => {
    if (data) {
      reset(cleanStaff(data));
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
        {isLoading && <LinearProgress />}
        {data && (
          <>
            <PageHeader
              pageTitle={`${data.firstName} ${data.lastName}`}
              backURL="/staff"
            />
            <Spacer size="lg" />
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  About {data.firstName} {data.lastName}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: true,
                        minLength: 1,
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, error },
                      }) => (
                        <TextField
                          fullWidth
                          label="First Name"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={getFormErrorMessage(error?.type)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: true,
                        minLength: 1,
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Last Name"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={getFormErrorMessage(error?.type)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: true,
                        minLength: 1,
                        pattern: EMAIL_REGEXP,
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={getFormErrorMessage(error?.type)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid },
                      }) => (
                        <FormControl fullWidth>
                          <InputLabel id="genderLabel">Gender</InputLabel>
                          <Select
                            labelId="genderLabel"
                            value={value}
                            onChange={onChange}
                            label="Gender"
                            error={invalid}
                          >
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="OTHER">Other</MenuItem>
                            <MenuItem value="NOT_SPECIFIED">
                              Prefer not to disclose
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
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
                      You cannot delete or suspend a super user
                    </Alert>
                    <Spacer />
                  </>
                )}
                {!data.isSuperUser && (
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography variant="h6">Suspend staff</Typography>
                      <Typography variant="body2">
                        Suspending a staff will suspend the user&apos;s ability
                        to access the app.
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
                      <Button variant="text" color="error">
                        Suspend
                      </Button>
                    </Grid>
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
                        disabled={!data.isSuspended}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                )}
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
