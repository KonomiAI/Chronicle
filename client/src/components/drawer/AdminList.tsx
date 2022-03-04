import React, { useState } from 'react';
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
import { useLocation } from 'react-router-dom';

export default function AdminList() {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <List>
      <ListItem button key="form_builder">
        <ListItemIcon>
          <DynamicForm />
        </ListItemIcon>
        <ListItemText primary="Customize Forms" />
      </ListItem>
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
            component="a"
            href="/staff"
            selected={pathname === '/staff'}
          >
            <ListItemIcon>
              <Badge />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Policy />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NetworkCheck />
            </ListItemIcon>
            <ListItemText primary="IP Allowlist" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
