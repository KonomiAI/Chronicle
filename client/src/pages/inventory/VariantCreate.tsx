import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Alert,
  AlertTitle,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Dialog,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Spacer from '../../components/spacer/Spacer';
import { PostVariantBody, Variant } from '../../types';
import {
  getFormErrorMessage,
  floatToPennies,
  penniesToFloat,
} from '../../utils';

interface VariantCreateDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCreate: (variant: PostVariantBody) => void;
  handleDelete: (variantId: string) => void;
  variant?: Variant | PostVariantBody;
  isCreateVariantLoading?: boolean;
  hasCreateVariantError?: boolean;
  isDeleteVariantLoading?: boolean;
  hasDeleteVariantError?: boolean;
}

const defaultProps = {
  variant: undefined,
  isCreateVariantLoading: false,
  hasCreateVariantError: false,
  isDeleteVariantLoading: false,
  hasDeleteVariantError: false,
};

const VariantCreateDialog: React.FC<VariantCreateDialogProps> = ({
  handleClose,
  isOpen,
  handleCreate,
  handleDelete,
  variant,
  isCreateVariantLoading,
  hasCreateVariantError,
  isDeleteVariantLoading,
  hasDeleteVariantError,
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
        {hasCreateVariantError && (
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while creating a variant
          </Alert>
        )}
        {hasDeleteVariantError && (
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while deleting a variant
          </Alert>
        )}
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
        {variant && (
          <LoadingButton
            loading={isDeleteVariantLoading}
            onClick={() => {
              handleDelete(variant.barcode);
              closeActions();
            }}
            sx={{ color: 'error.main' }}
          >
            Delete
          </LoadingButton>
        )}
        <LoadingButton
          loading={isCreateVariantLoading}
          onClick={handleSubmit((data) => {
            handleCreate({
              ...data,
              price: floatToPennies(data.price),
            });
            closeActions();
          })}
        >
          {variant ? 'Save' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

VariantCreateDialog.defaultProps = defaultProps;

export default VariantCreateDialog;
