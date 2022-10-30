import React from 'react';
import {
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { Features } from '../../types';
import { useStore } from '../../store';

interface DrawerEntryProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  feature?: Features;
}

export const DrawerEntry = ({ title, to, icon, feature }: DrawerEntryProps) => {
  const { pathname } = useLocation();
  const { permissions, user } = useStore();

  if (feature && !user?.isSuperUser && !permissions[feature]?.read) {
    return null;
  }

  return (
    <Tooltip title={title} placement="right">
      <ListItemButton component={Link} to={to} selected={pathname === to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Tooltip>
  );
};
