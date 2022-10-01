/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
import { Customer } from '../../types';
import { useCustomerList } from '../../data';
import Spacer from '../spacer/Spacer';

export interface CustomerSelectDialogProps {
  open: boolean;
  handleClose: (customer: Customer | null) => void;
}

interface CustomerOption extends Customer {
  label: string;
}

export function CustomerSelectDialog({
  open,
  handleClose,
}: CustomerSelectDialogProps) {
  const { data } = useCustomerList();
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<CustomerOption | null>(null);
  let options: CustomerOption[] = [];
  if (data) {
    options = data.map((customer) => ({
      ...customer,
      label: `${customer.firstName} ${customer.lastName}`,
    }));
  }
  return (
    <Dialog open={open}>
      <DialogTitle>Select Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a customer from the list below. If the customer you are looking
          for is not here, click the Create Customer button to create a new
          customer.
        </DialogContentText>
        <Spacer />
        {data ? (
          <Autocomplete
            options={options}
            onChange={(_, value) => setSelectedCustomer(value)}
            renderInput={(params) => <TextField {...params} label="Customer" />}
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
