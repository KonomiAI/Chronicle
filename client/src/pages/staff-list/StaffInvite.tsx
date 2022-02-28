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
} from '@mui/material';
import Spacer from '../../components/spacer/Spacer';
import { ContentCopy } from '@mui/icons-material';

export interface StaffInviteDialogProps {
  handleClose: Function;
}

export const StaffInviteForm = ({ handleClose }: StaffInviteDialogProps) => {
  const [temp, setTemp] = useState();
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
            <TextField
              fullWidth
              id="firstName"
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              variant="outlined"
              autoComplete="nope"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="inherit">
          Cancel
        </Button>
        <Button>Subscribe</Button>
      </DialogActions>
    </>
  );
};

const StaffInviteResult = ({ handleClose }: StaffInviteDialogProps) => (
  <>
    <DialogTitle>Staff invited!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Here are the authentication details for Daniel Wu. This screen is only
        shown once. Make sure you write down the details soon.
      </DialogContentText>
      <Spacer />
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              Email
            </Grid>
            <Grid item xs={12} md={10}>
              wuonlabs@gmail.com
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
              hcsiy238qpada3As{' '}
              <IconButton color="inherit" size="small">
                <ContentCopy />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose()} color="inherit">
        Done
      </Button>
    </DialogActions>
  </>
);

export default function StaffInviteDialog({
  handleClose,
}: StaffInviteDialogProps) {
  // This is most likely temporary for now, will be based on
  // data instead of arbitrary state in the future.
  const [showStep2, setShowStep2] = useState(true);
  return showStep2 ? (
    <StaffInviteResult handleClose={handleClose} />
  ) : (
    <StaffInviteForm handleClose={handleClose} />
  );
}
