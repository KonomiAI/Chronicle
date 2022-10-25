import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Alert,
  AlertTitle,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Dialog,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { FormInputField } from '../../components/form-inputs/FormInputField';
import Spacer from '../../components/spacer/Spacer';
import { VariantBodyDto, Variant } from '../../types';
import { floatToPennies, penniesToFloat, PRICE_REGEXP } from '../../utils';

const isExistingVariant = (data: unknown): data is Variant =>
  typeof data === 'object' &&
  data !== null &&
  'id' in data &&
  'ActivityEntry' in data;

interface VariantCreateDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (variant: VariantBodyDto, variantId?: string) => void;
  handleDelete: (variantId: string) => void;
  variant?: Variant | VariantBodyDto;
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

const VariantManageDialog: React.FC<VariantCreateDialogProps> = ({
  handleClose,
  isOpen,
  handleSave,
  handleDelete,
  variant,
  isCreateVariantLoading,
  hasCreateVariantError,
  isDeleteVariantLoading,
  hasDeleteVariantError,
}) => {
  const { control, handleSubmit, reset } = useForm<VariantBodyDto>();

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
            <AlertTitle>An unexpected error has occurred</AlertTitle>
            Something went wrong while creating a variant
          </Alert>
        )}
        {hasDeleteVariantError && (
          <Alert severity="error">
            <AlertTitle>An unexpected error has occurred</AlertTitle>
            Something went wrong while deleting a variant
          </Alert>
        )}
        <Spacer />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInputField
              name="description"
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              label="Variant descriptor"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputField
              type="number"
              name="price"
              fieldStartAdornment="money"
              control={control}
              rules={{
                required: true,
                minLength: 1,
                pattern: PRICE_REGEXP,
              }}
              label="Price"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputField
              name="barcode"
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              label="Barcode"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={closeActions}>
          Cancel
        </Button>
        {isExistingVariant(variant) && (
          <LoadingButton
            loading={isDeleteVariantLoading}
            disabled={!!variant.ActivityEntry?.length}
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
            handleSave(
              {
                ...data,
                price: floatToPennies(data.price),
              },
              variant?.id,
            );
            closeActions();
          })}
        >
          {variant ? 'Save' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

VariantManageDialog.defaultProps = defaultProps;

export default VariantManageDialog;
