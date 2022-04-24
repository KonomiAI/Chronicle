import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Dialog,
} from '@mui/material';

import Spacer from '../../components/spacer/Spacer';
import { PostVariantBody } from '../../types';
import {
  getFormErrorMessage,
  floatToPennies,
  penniesToFloat,
} from '../../utils';

interface VariantCreateDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCreate: (variant: PostVariantBody) => void;
  variant?: PostVariantBody;
}

const VariantCreateDialog: React.FC<VariantCreateDialogProps> = ({
  handleClose,
  isOpen,
  handleCreate,
  variant,
}) => {
  const { control, handleSubmit, reset } = useForm<PostVariantBody>();

  useEffect(() => {
    reset({
      description: variant?.description,
      price: penniesToFloat(variant?.price || 0),
      barcode: variant?.barcode,
    });
  }, [variant]);

  const closeActions = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={closeActions}>
      <DialogTitle>
        {variant ? 'Update a variant' : 'Create a new variant'}
      </DialogTitle>
      <DialogContent>
        <Spacer />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="description"
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
                  label="Variant Descriptor (i.e 500ml, blue)"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  required
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="price"
              control={control}
              rules={{
                required: true,
                minLength: 1,
                pattern: {
                  value: /^\d*(\.\d{0,2})?$/,
                  message: 'Please enter a valid price (eg: 1.00)',
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  type="number"
                  inputMode="numeric"
                  fullWidth
                  label="Price"
                  variant="outlined"
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                  value={value}
                  required
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="barcode"
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
                  label="Barcode"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  required
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={closeActions}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit((data) => {
            handleCreate({
              ...data,
              price: floatToPennies(data.price),
            });
            closeActions();
          })}
        >
          {variant ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VariantCreateDialog;
