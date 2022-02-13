import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Article,
  DynamicForm,
  Face,
  Home,
  Insights,
  Inventory,
  Security,
  ChevronLeft,
} from '@mui/icons-material';
import { DRAWER_WIDTH } from '../../vars';

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
        <ListItem button key="home">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="customers">
          <ListItemIcon>
            <Face />
          </ListItemIcon>
          <ListItemText primary="Customer Profiles" />
        </ListItem>
        <ListItem button key="entries">
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="Activity Entries" />
        </ListItem>
        <ListItem button key="inventory">
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button key="analytics">
          <ListItemIcon>
            <Insights />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <Divider />
        <List>
          <ListItem button key="form_builder">
            <ListItemIcon>
              <DynamicForm />
            </ListItemIcon>
            <ListItemText primary="Customize Forms" />
          </ListItem>
          <ListItem button key="security">
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Security Settings" />
          </ListItem>
        </List>
      </List>
    </Drawer>
  );
}
