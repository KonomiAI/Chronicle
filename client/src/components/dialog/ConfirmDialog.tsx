import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from '@mui/material';

export interface ConfirmDialogProps {
  dialogTitle: string;
  dialogMessage?: string;
  open: boolean;
  cancelAction?: () => void;
  confirmAction?: () => void;
}

export default function ConfirmDialog({
  dialogTitle,
  dialogMessage,
  open,
  cancelAction,
  confirmAction,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogMessage && (
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button color="inherit" onClick={cancelAction}>
          Cancel
        </Button>
        <Button onClick={confirmAction}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
