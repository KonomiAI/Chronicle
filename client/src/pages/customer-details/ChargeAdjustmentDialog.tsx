import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import { FormSelect } from '../../components/form-inputs/FormSelect';
import Spacer from '../../components/spacer/Spacer';
import { CustomerChargePostDto } from '../../types';
import { priceCheck } from '../../utils';

export interface ChargeAdjustmentDialogProps {
  onClose: () => void;
  open: boolean;
  onConfirm: (data: CustomerChargePostDto, adjustmentType: string) => void;
}

export default function ChargeAdjustmentDialog({
  onClose,
  onConfirm,
  open,
}: ChargeAdjustmentDialogProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      adjustment: 'positive',
      amount: 0,
      description: '',
    },
  });
  return (
    <Dialog open={open} onBackdropClick={onClose} fullWidth>
      <DialogTitle>Create an adjustment</DialogTitle>
      <DialogContent>
        <Spacer size="sm" />
        <Stack component="form" spacing={2}>
          <FormSelect
            control={control}
            name="adjustment"
            label="Adjustment type"
          >
            <MenuItem value="negative">
              Negative (subtract from customer balance)
            </MenuItem>
            <MenuItem value="positive">
              Positive (add to customer balance)
            </MenuItem>
          </FormSelect>
          <FormInputField
            autoFocus
            control={control}
            name="amount"
            label="Adjustment amount"
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
        <Button
          onClick={handleSubmit(({ adjustment, ...rest }) =>
            onConfirm(
              {
                ...rest,
                amount: rest.amount * (adjustment === 'positive' ? -1 : 1),
              },
              adjustment,
            ),
          )}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
