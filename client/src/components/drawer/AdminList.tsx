import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Badge,
  DynamicForm,
  ExpandLess,
  ExpandMore,
  NetworkCheck,
  Policy,
  Security,
} from '@mui/icons-material';

import { useStore } from '../../store';
import { Features } from '../../types';

export default function AdminList() {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const { pathname } = useLocation();
  const { permissions } = useStore();

  return (
    <List>
      {permissions[Features.FORM]?.read && (
        <ListItem
          component={Link}
          to="/forms"
          selected={pathname === '/forms'}
          key="forms"
          sx={{ color: 'inherit' }}
        >
          <ListItemIcon>
            <DynamicForm />
          </ListItemIcon>
          <ListItemText primary="Customize Forms" />
        </ListItem>
      )}

      {permissions[Features.SECURITY]?.read && (
        <>
          <ListItem
            button
            key="security"
            onClick={() => setIsSecurityOpen(!isSecurityOpen)}
          >
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Security" />
            {isSecurityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isSecurityOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/staff"
                selected={pathname === '/staff'}
              >
                <ListItemIcon>
                  <Badge />
                </ListItemIcon>
                <ListItemText primary="Staff" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/roles"
                selected={pathname === '/roles'}
              >
                <ListItemIcon>
                  <Policy />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/allowlist"
                selected={pathname === '/allowlist'}
              >
                <ListItemIcon>
                  <NetworkCheck />
                </ListItemIcon>
                <ListItemText primary="IP Allowlist" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
}
