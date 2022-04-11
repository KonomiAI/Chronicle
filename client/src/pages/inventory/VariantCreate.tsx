import React from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';

import Spacer from '../../components/spacer/Spacer';

export interface VariantCreateDialogProps {
  handleClose: (created: boolean) => void;
}

// TODO fix these components up
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VariantCreateForm = ({ handleClose }: VariantCreateDialogProps) => (
  <>
    <DialogTitle>Create a New Variant</DialogTitle>
    <DialogContent>
      <Spacer />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Variant Descriptor (i.e 500ml, blue)"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Price" variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Barcode" variant="outlined" />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button color="inherit">Cancel</Button>
      <Button>Create</Button>
    </DialogActions>
  </>
);

export default function VaraintCreateDialog({
  handleClose,
}: VariantCreateDialogProps) {
  return <VariantCreateForm handleClose={handleClose} />;
}
