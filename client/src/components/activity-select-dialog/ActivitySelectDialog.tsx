/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from '@mui/material';
import React from 'react';
import { useGetActivities } from '../../data';
import { Activity } from '../../types';
import Spacer from '../spacer/Spacer';

export interface ActivitySelectDialogProps {
  open: boolean;
  handleClose: (customer: Activity | null) => void;
}

interface CustomerOption extends Activity {
  label: string;
}

export function ActivitySelectDialog({
  handleClose,
  open,
}: ActivitySelectDialogProps) {
  const { data } = useGetActivities();
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<CustomerOption | null>(null);
  let options: CustomerOption[] = [];
  if (data) {
    options = data.map((activity) => ({
      ...activity,
      label: `${activity.name}`,
    }));
  }
  return (
    <Dialog open={open} onClose={() => handleClose(null)} fullWidth>
      <DialogTitle>Select Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select an activity from the list below.
        </DialogContentText>
        <Spacer />
        {data ? (
          <Autocomplete
            options={options}
            onChange={(_, value) => setSelectedCustomer(value)}
            renderInput={(params) => <TextField {...params} label="Activity" />}
          />
        ) : (
          <LinearProgress />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(null)}>Cancel</Button>
        <Button
          onClick={() => handleClose(selectedCustomer)}
          disabled={!selectedCustomer}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
