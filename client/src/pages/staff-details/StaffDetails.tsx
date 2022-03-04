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
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { getStaff, StaffUpdateData, updateStaff } from '../../data';
import SaveBar from '../../components/save-bar/save-bar';
import Gender from '../../types/gender';
import { Staff } from '../../types';

const cleanStaff = (staff: Staff) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...clean } = staff;
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
  const cacheKey = `staff-${id}`;
  const { data } = useQuery(cacheKey, () => getStaff(id));
  const queryClient = useQueryClient();
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { control, reset, handleSubmit, watch } = useForm<StaffUpdateData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: Gender.NOT_SPECIFIED,
    },
  });
  const updateStaffAndMutate = useMutation(updateStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries(cacheKey);
      setIsSaveOpen(false);
    },
  });

  useEffect(() => {
    if (data) {
      reset(cleanStaff(data));
    }
    const subscription = watch(() => setIsSaveOpen(true));
    return () => subscription.unsubscribe();
  }, [data, watch]);

  const saveChanges = (values: StaffUpdateData) =>
    updateStaffAndMutate.mutate({
      id,
      data: values,
    });

  return (
    <>
      <Container>
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
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          label="First Name"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          label="Last Name"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <FormControl fullWidth>
                          <InputLabel id="genderLabel">Gender</InputLabel>
                          <Select
                            labelId="genderLabel"
                            value={value}
                            onChange={onChange}
                            label="Gender"
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
                <FormControl fullWidth>
                  <InputLabel id="roleLabel">Role</InputLabel>
                  <Select
                    id="roleSelect"
                    value={['masseuse']}
                    label="Role"
                    labelId="roleLabel"
                    multiple
                  >
                    <MenuItem value="masseuse">Masseuse</MenuItem>
                    <MenuItem value="female">Receptionist</MenuItem>
                    <MenuItem value="other">Admin</MenuItem>
                    <MenuItem value="na">IT folk</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
                  Danger Zone
                </Typography>
                {data.isSuperUser && (
                  <Alert severity="warning">
                    You cannot delete or suspend a super user
                  </Alert>
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
                      disabled={!data.isSuspended || data.isSuperUser}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
      <SaveBar open={isSaveOpen} onSave={handleSubmit(saveChanges)} />
    </>
  );
}
