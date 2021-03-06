/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import {
  useRole,
  useFeaturesList,
  updateRole,
  createRole,
  deleteRole,
} from '../../data';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import SaveBar from '../../components/save-bar/save-bar';
import { Feature, Role, RoleData } from '../../types';

const cleanRole = (role: Role) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...clean } = role;
  return clean;
};

export interface RoleProps {
  create?: boolean;
  data?: Role;
  saveChanges: (data: RoleData) => void;
}

const rawRole = {
  name: '',
  permissions: {
    Inventory: {
      read: false,
      write: false,
    },
    Security: {
      read: false,
      write: false,
    },
    Customer: {
      read: false,
      write: false,
    },
    Entry: {
      read: false,
      write: false,
    },
    Form: {
      read: false,
      write: false,
    },
  },
};

export default function RoleDetails({ create, data, saveChanges }: RoleProps) {
  const { data: featureList } = useFeaturesList();
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const navigate = useNavigate();

  const { control, reset, handleSubmit, watch } = useForm<RoleData>({
    defaultValues: rawRole,
  });

  useEffect(() => {
    const subscription = watch(() => setIsSaveOpen(true));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // set the form state to match data from server.
    // Not necessary for create
    if (!create && data) {
      reset(cleanRole(data));
      setIsSaveOpen(false);
    }
  }, [data, create]);

  const deleteRoleAndMutate = useMutation(deleteRole, {
    onSuccess: () => {
      navigate('/roles', { replace: true });
    },
  });

  const removeRole = () => {
    if (!create && data?.id) {
      deleteRoleAndMutate.mutate(data.id);
    }
  };

  return (
    <Container>
      <>
        <PageHeader
          pageTitle={create ? 'New Role' : 'Role information'}
          backURL="/roles"
        />
        <Spacer size="lg" />
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              About this role
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" variant="outlined" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Permissions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Read
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Write
                </Typography>
              </Grid>
              {featureList?.map((s: Feature) => (
                <Grid container spacing={2} key={s.id}>
                  <Grid item xs={8}>
                    <Typography ml={2}>{s.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Controller
                      name={`permissions.${s.name}.read`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Controller
                      name={`permissions.${s.name}.write`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        {!create && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
                Danger Zone
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <Typography variant="h6">Delete this role</Typography>
                  <Typography variant="body2">
                    You cannot delete this role if it is currently assigned to
                    any staff. Please remove the role from all staff first.
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
                    onClick={() => removeRole()}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </>
      {isSaveOpen ? <Spacer size="saveBar" /> : <Spacer size="lg" />}
      <SaveBar
        open={isSaveOpen}
        onSave={handleSubmit((res) => {
          setIsSaveOpen(false);
          saveChanges(res);
        })}
      />
    </Container>
  );
}

export function UpdateRoleForm() {
  const { id } = useParams();
  if (!id) {
    throw Error('Id must be defined in the route');
  }
  const { data } = useRole(id);
  const queryClient = useQueryClient();

  const updateRoleAndMutate = useMutation(updateRole, {
    onSuccess: () => {
      queryClient.invalidateQueries(['role', id]);
    },
  });

  const saveChanges = (values: RoleData) =>
    updateRoleAndMutate.mutate({
      id,
      data: values,
    });

  return <RoleDetails data={data} saveChanges={saveChanges} />;
}

export function CreateRoleForm() {
  const navigate = useNavigate();
  const createRoleAndMutate = useMutation(createRole, {
    onSuccess: (created) => {
      navigate(`/roles/${created.id}`, { replace: true });
    },
  });
  const saveChanges = (values: RoleData) => createRoleAndMutate.mutate(values);
  return <RoleDetails create saveChanges={saveChanges} />;
}
