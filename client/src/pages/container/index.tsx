import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import ChronicleAppBar from '../../components/app-bar';
import ChronicleDrawer from '../../components/drawer';

const drawerWidth = 240;

function MainContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <ChronicleAppBar
        open={isDrawerOpen}
        handleDrawerOpen={() => setIsDrawerOpen(true)}
      />
      <ChronicleDrawer
        open={isDrawerOpen}
        handleDrawerClose={() => setIsDrawerOpen(false)}
      />
      <Box
        sx={{
          paddingTop: 3,
          transition: theme.transitions.create(['padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(!isDrawerOpen
            ? { paddingLeft: `calc(${theme.spacing(7)} + 1px)` }
            : { paddingLeft: `${drawerWidth}px` }),
        }}
        component="main"
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainContainer;
