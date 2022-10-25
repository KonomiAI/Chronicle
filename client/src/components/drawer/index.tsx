import React from 'react';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { List, Divider, IconButton } from '@mui/material';
import {
  Article,
  Face,
  Home,
  Insights,
  Inventory,
  ChevronLeft,
} from '@mui/icons-material';

import { DRAWER_WIDTH } from '../../vars';
import AdminList from './AdminList';
import { Features } from '../../types';
import { DrawerEntry } from './DrawerEntry';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export default function ChronicleDrawer({
  open,
  handleDrawerClose,
}: DrawerProps) {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <DrawerEntry title="Home" to="/" icon={<Home />} />
        <DrawerEntry
          title="Customer profiles"
          to="/customers"
          icon={<Face />}
          feature={Features.CUSTOMER}
        />
        <DrawerEntry
          title="Activity entries"
          to="/activity-entries"
          icon={<Article />}
          feature={Features.ENTRY}
        />
        <DrawerEntry
          title="Inventory"
          to="/inventory"
          icon={<Inventory />}
          feature={Features.INVENTORY}
        />
        <DrawerEntry title="Analytics" to="/analytics" icon={<Insights />} />
        <Divider />
        <AdminList />
      </List>
    </Drawer>
  );
}
