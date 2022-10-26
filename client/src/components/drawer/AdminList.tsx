import React, { useState } from 'react';

import {
  Collapse,
  List,
  ListItem,
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
  LibraryBooks,
} from '@mui/icons-material';

import { Features } from '../../types';
import { DrawerEntry } from './DrawerEntry';

export default function AdminList() {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  return (
    <List>
      <DrawerEntry
        title="Customize Forms"
        to="/forms"
        icon={<DynamicForm />}
        feature={Features.FORM}
      />
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
          <DrawerEntry
            title="Staff"
            to="/staff"
            icon={<Badge />}
            feature={Features.FORM}
          />
          <DrawerEntry
            title="Roles"
            to="/roles"
            icon={<Policy />}
            feature={Features.FORM}
          />
          <DrawerEntry
            title="IP allowlist"
            to="/allowlist"
            icon={<NetworkCheck />}
            feature={Features.FORM}
          />
          <DrawerEntry
            title="Audit Log"
            to="/audit"
            icon={<LibraryBooks />}
            feature={Features.FORM}
          />
        </List>
      </Collapse>
    </List>
  );
}
