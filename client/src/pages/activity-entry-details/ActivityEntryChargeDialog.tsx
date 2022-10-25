import React from 'react';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import LoadingCard from '../../components/loading-card';
import Spacer from '../../components/spacer/Spacer';
import { useChargeSummary } from '../../data';
import { ActivityEntry, ChargeCreateDto } from '../../types/activity-entry';
import { penniesToPrice, PRICE_REGEXP } from '../../utils';
import { TipButton } from './components/TipButton';

export interface ActivityEntryChargeDialogProps {
  open: boolean;
  entry: ActivityEntry;
  onClose: () => void;
  onConfirm: (chargeBody: ChargeCreateDto) => void;
}

export default function ActivityEntryChargeDialog({
  open,
  onClose,
  entry,
  onConfirm,
}: ActivityEntryChargeDialogProps) {
  const { data: chargeSummary, isLoading } = useChargeSummary(entry.id);
  const { control, watch, setValue, handleSubmit } = useForm<ChargeCreateDto>({
    defaultValues: {
      tipAmount: 0,
      description: '',
    },
  });
  return (
    <Dialog open={open}>
      <DialogTitle>Confirm Charge</DialogTitle>
      <DialogContent>
        {isLoading && <LoadingCard title="Crunching some numbers..." />}
        {chargeSummary && (
          <div>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Spacer size="sm" />
                <FormInputField
                  type="number"
                  control={control}
                  label="Tip"
                  fieldStartAdornment="money"
                  name="tipAmount"
                  rules={{
                    min: 0,
                    pattern: PRICE_REGEXP,
                  }}
                />
                <Spacer size="sm" />
                <ButtonGroup size="large" fullWidth>
                  {[0.15, 0.2, 0.25].map((p) => (
                    <TipButton
                      key={p}
                      onSelect={(v) => setValue('tipAmount', v)}
                      percentage={p}
                      subtotal={chargeSummary.amount}
                    />
                  ))}
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <FormInputField
                  control={control}
                  label="Charge description"
                  name="description"
                  multiline={3}
                />
              </Grid>
              <Grid item xs={4}>
                Customer Balance
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} sx={{ textAlign: 'end' }}>
                {penniesToPrice(
                  // This is to prevent the balance from displaying `-0.00`
                  chargeSummary.balance !== 0 ? -chargeSummary.balance : 0,
                )}
              </Grid>
              <Grid item xs={4}>
                Subtotal
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} sx={{ textAlign: 'end' }}>
                {penniesToPrice(-chargeSummary.amount)}
              </Grid>
              <Grid item xs={4}>
                Tip amount
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} sx={{ textAlign: 'end' }}>
                {penniesToPrice(-watch('tipAmount') * 100)}
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">Total charge</Typography>
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} sx={{ textAlign: 'end' }}>
                {penniesToPrice(
                  -watch('tipAmount') * 100 - chargeSummary.amount,
                )}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                Remaining balance
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} sx={{ textAlign: 'end' }}>
                {penniesToPrice(
                  -(
                    chargeSummary.balance +
                    watch('tipAmount') * 100 +
                    chargeSummary.amount
                  ),
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit((data) =>
            onConfirm({ ...data, tipAmount: data.tipAmount * 100 }),
          )}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
