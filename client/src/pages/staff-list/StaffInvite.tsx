import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  Card,
  IconButton,
  CardContent,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import Spacer from '../../components/spacer/Spacer';
import { createStaff, StaffPostData, useRoleList } from '../../data';
import {
  EMAIL_REGEXP,
  getFormErrorMessage,
  secureRandomString,
  useClipboard,
} from '../../utils';

type StaffFormResult = Omit<StaffPostData, 'password'>;
export interface StaffInviteDialogProps {
  handleClose: (created: boolean) => void;
}

export interface StaffInviteFormProps extends StaffInviteDialogProps {
  handleNext: (details: StaffPostData) => void;
}

export interface StaffInviteResultProps extends StaffInviteDialogProps {
  details?: StaffPostData;
}

const StaffInviteForm = ({ handleClose, handleNext }: StaffInviteFormProps) => {
  const { handleSubmit, control } = useForm<StaffFormResult>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      roleIds: [],
    },
  });
  const queryClient = useQueryClient();
  const { data: roleListData } = useRoleList();
  const updateStaffAndMutate = useMutation(createStaff, {
    onSuccess: (_, data) => {
      queryClient.invalidateQueries('staffList');
      handleNext(data);
    },
  });
  const onSubmit = async (data: StaffFormResult) => {
    const copy: StaffPostData = {
      ...data,
      password: secureRandomString(12),
    };
    updateStaffAndMutate.mutate(copy);
  };

  return (
    <>
      <DialogTitle>Invite a new staff</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Invite a new staff to your team. You can assign one role for now, you
          can add more roles to this staff later on.
        </DialogContentText>
        <Spacer />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* We will probably want to abstract this as a component */}
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
          <Grid item xs={6}>
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
              name="roleIds"
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
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
                    multiple
                    error={invalid}
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Invite</Button>
      </DialogActions>
    </>
  );
};

const StaffInviteResult = ({
  handleClose,
  details,
}: StaffInviteResultProps) => {
  const copyToClipboard = useClipboard();
  return (
    <>
      <DialogTitle>Staff invited!</DialogTitle>
      <DialogContent>
        <Alert severity="warning">
          This screen is only shown once. Make sure you write down the details
          before leaving.
        </Alert>
        <Spacer />
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                Email
              </Grid>
              <Grid item xs={12} md={10}>
                {details?.email}
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Password
              </Grid>
              <Grid item xs={12} md={10}>
                {details?.password}{' '}
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => copyToClipboard(details?.password ?? '')}
                >
                  <ContentCopy />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)} color="inherit">
          Done
        </Button>
      </DialogActions>
    </>
  );
};

export default function StaffInviteDialog({
  handleClose,
}: StaffInviteDialogProps) {
  // This is most likely temporary for now, will be based on
  // data instead of arbitrary state in the future.
  const [details, setDetails] = useState<StaffPostData | undefined>(undefined);
  return details ? (
    <StaffInviteResult handleClose={handleClose} details={details} />
  ) : (
    <StaffInviteForm
      handleClose={handleClose}
      handleNext={(d) => setDetails(d)}
    />
  );
}
