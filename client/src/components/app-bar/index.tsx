import React, { useEffect } from 'react';

import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

import { DRAWER_WIDTH } from '../../vars';
import { useStore } from '../../store';
import AccountMenu from '../account-menu';

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}

interface ChronicleAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

export default function ChronicleAppBar({
  open,
  handleDrawerOpen,
}: ChronicleAppBarProps) {
  useEffect(() => {
    useStore.setState({ sidebarOpen: open });
  }, [open]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="inherit" open={open}>
        <Toolbar>
          {!open && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {import.meta.env.VITE_SITE_TITLE}
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
