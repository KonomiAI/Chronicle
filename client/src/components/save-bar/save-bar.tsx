import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Grid, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { DRAWER_WIDTH } from '../../vars';
import { useStore } from '../../store';

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}
export interface SaveBarProps {
  open: boolean;
  loading?: boolean;
  onSave: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function SaveBar({ onSave, open, loading }: SaveBarProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isLoading] = useState(!!loading);
  const minState = useStore.getState().sidebarOpen;
  const [sidebarOpen, setSideBar] = useState(minState);

  useEffect(() => {
    setIsOpen(open);
    useStore.subscribe(
      (state) => state.sidebarOpen,
      (state) => setSideBar(state),
    );
  }, [open]);
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{ top: 'auto', bottom: 0, display: isOpen ? 'block' : 'none' }}
      open={sidebarOpen}
    >
      <Toolbar>
        <Container>
          <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">You have unsaved changes</Typography>
            </Grid>
            <Grid item xs={7} />
            <Grid item xs={1}>
              <Button variant="text" onClick={onSave} disabled={isLoading}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
