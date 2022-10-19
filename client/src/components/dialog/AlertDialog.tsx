import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from '@mui/material';

export interface AlertDialogProps {
  dialogTitle: string;
  dialogMessage?: string;
  open: boolean;
  confirmAction?: () => void;
}

export default function AlertDialog({
  dialogTitle,
  dialogMessage,
  open,
  confirmAction,
}: AlertDialogProps) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogMessage && (
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={confirmAction}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
