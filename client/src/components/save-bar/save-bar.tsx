import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

export interface SaveBarProps {
  open: boolean;
  onSave: () => void;
}

export default function SaveBar({ onSave, open }: SaveBarProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{ top: 'auto', bottom: 0, display: isOpen ? 'block' : 'none' }}
    >
      <Toolbar>
        <Container>
          <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">You have unsaved changes</Typography>
            </Grid>
            <Grid item xs={7} />
            <Grid item xs={1}>
              <Button variant="text" onClick={onSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
