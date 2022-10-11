import React from 'react';
import { useLocation } from 'react-router-dom';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Article,
  Face,
  Home,
  Insights,
  Inventory,
  ChevronLeft,
} from '@mui/icons-material';

import { DRAWER_WIDTH } from '../../vars';
import { useStore } from '../../store';
import AdminList from './AdminList';
import { Features } from '../../types';

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
  const { pathname } = useLocation();
  const { permissions } = useStore();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemButton
          key="home"
          component="a"
          href="/"
          selected={pathname === '/'}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        {permissions[Features.CUSTOMER]?.read && (
          <ListItemButton
            component="a"
            href="/customers"
            selected={pathname === '/customers'}
            key="customers"
          >
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText primary="Customer Profiles" />
          </ListItemButton>
        )}

        {permissions[Features.ENTRY]?.read && (
          <ListItemButton
            key="entries"
            component="a"
            href="/activity-entries"
            selected={pathname === '/activity-entries'}
          >
            <ListItemIcon>
              <Article />
            </ListItemIcon>
            <ListItemText primary="Activity Entries" />
          </ListItemButton>
        )}

        {permissions[Features.INVENTORY]?.read && (
          <ListItemButton
            component="a"
            href="/inventory"
            selected={pathname === '/inventory'}
          >
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItemButton>
        )}

        <ListItemButton
          component="a"
          href="/analytics"
          selected={pathname === '/analytics'}
        >
          <ListItemIcon>
            <Insights />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>
        <Divider />
        <AdminList />
      </List>
    </Drawer>
  );
}
