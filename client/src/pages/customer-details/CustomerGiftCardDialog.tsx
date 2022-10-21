import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import Spacer from '../../components/spacer/Spacer';
import { CustomerChargePostDto } from '../../types';
import { priceCheck } from '../../utils';

export interface CustomerGiftCardDialogProps {
  onClose: () => void;
  open: boolean;
  onConfirm: (data: CustomerChargePostDto) => void;
}

export default function CustomerGiftCardDialog({
  onClose,
  onConfirm,
  open,
}: CustomerGiftCardDialogProps) {
  const { control, handleSubmit } = useForm<CustomerChargePostDto>({
    defaultValues: {
      amount: 0,
      description: '',
    },
  });
  return (
    <Dialog open={open} onBackdropClick={onClose} fullWidth>
      <DialogTitle>Deposit a gift card</DialogTitle>
      <DialogContent>
        <Spacer size="sm" />
        <Stack component="form" spacing={2}>
          <FormInputField
            autoFocus
            control={control}
            name="amount"
            label="Gift card amount"
            fieldStartAdornment="money"
            rules={{
              required: true,
              pattern: priceCheck,
              min: 0,
            }}
          />
          <FormInputField
            control={control}
            name="description"
            label="Notes (optional)"
            multiline={3}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit((data) => onConfirm(data))}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
