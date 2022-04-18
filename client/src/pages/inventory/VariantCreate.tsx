import React from 'react';
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
import { getFormErrorMessage } from '../../utils';

interface VariantCreateDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCreate: (variant: PostVariantBody) => void;
}

const VariantCreateDialog: React.FC<VariantCreateDialogProps> = ({
  handleClose,
  isOpen,
  handleCreate,
}) => {
  const { control, handleSubmit } = useForm<PostVariantBody>({});

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Create a New Variant</DialogTitle>
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
              }}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  type="number"
                  fullWidth
                  label="Price"
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
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit((data) => {
            handleCreate(data);
            handleClose();
          })}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VariantCreateDialog;
