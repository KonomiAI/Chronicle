import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Card,
  IconButton,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';

import Spacer from '../../components/spacer/Spacer';
import { updateStaff } from '../../data';
import { secureRandomString, useClipboard } from '../../utils';
import { Staff, StaffUpdateData } from '../../types';
import { cleanStaffForUpdate } from './utils';

export interface StaffInviteDialogProps {
  handleClose: (created: boolean) => void;
  staff: Staff;
}

export interface StaffInviteFormProps extends StaffInviteDialogProps {
  handleNext: (details: StaffUpdateData) => void;
}

export interface StaffInviteResultProps extends StaffInviteDialogProps {
  details?: StaffUpdateData;
}

const StaffInviteForm = ({
  handleClose,
  handleNext,
  staff,
}: StaffInviteFormProps) => {
  const queryClient = useQueryClient();
  const updateStaffAndMutate = useMutation(updateStaff, {
    onSuccess: (_, data) => {
      queryClient.invalidateQueries(['staff', staff.id]);
      handleNext(data.data);
    },
  });
  const onSubmit = async () => {
    const copy: StaffUpdateData = {
      ...cleanStaffForUpdate(staff),
      password: secureRandomString(12),
    };
    updateStaffAndMutate.mutate({
      id: staff.id,
      data: copy,
    });
  };

  return (
    <>
      <DialogTitle>Reset staff password</DialogTitle>
      <DialogContent data-testid="div-reset-password-body">
        <DialogContentText>
          You are about to reset the password for {staff.firstName}{' '}
          {staff.lastName}. They will not be signed out of the system, this
          action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="inherit">
          Cancel
        </Button>
        <Button onClick={() => onSubmit()} data-testid="btn-confirm-reset">
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

const PasswordResetResult = ({
  handleClose,
  details,
}: StaffInviteResultProps) => {
  const copyToClipboard = useClipboard();

  const [showSnack, setShowSnack] = useState(false);

  return (
    <>
      <DialogTitle>Password reset success</DialogTitle>
      <DialogContent>
        <Alert severity="warning">
          This screen is only shown once. Make sure you write down the details
          before leaving.
        </Alert>
        <Spacer />
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                New Password
              </Grid>
              <Grid item xs={12} md={9}>
                {details?.password}{' '}
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    copyToClipboard(details?.password ?? '');
                    setShowSnack(true);
                  }}
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
      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={() => setShowSnack(false)}
        message="Password copied to clipboard!"
      />
    </>
  );
};

export default function ResetStaffPasswordDialog({
  handleClose,
  staff,
}: StaffInviteDialogProps) {
  // This is most likely temporary for now, will be based on
  // data instead of arbitrary state in the future.
  const [details, setDetails] = useState<StaffUpdateData | undefined>(
    undefined,
  );
  return details ? (
    <PasswordResetResult
      handleClose={handleClose}
      details={details}
      staff={staff}
    />
  ) : (
    <StaffInviteForm
      staff={staff}
      handleClose={handleClose}
      handleNext={(d) => setDetails(d)}
    />
  );
}
