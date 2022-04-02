import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import Close from '@mui/icons-material/Close';


export interface ConfirmDialogProps {
    dialogTitle: string;
    open: boolean;
    cancelAction: () => void;
    confirmAction: () => void;
}


export default function PageHeader({
    dialogTitle,
    open,
    cancelAction,
    confirmAction,

  }: ConfirmDialogProps) {
    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <Box position="absolute" top={0} right={0}>
            <IconButton onClick={cancelAction}>
                <Close />
            </IconButton>
            </Box>
            <DialogActions>
            <Button color="inherit" variant="contained" onClick={cancelAction}>
                Cancel
            </Button>
            <Button variant="contained" onClick={confirmAction}>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
    );
  }

