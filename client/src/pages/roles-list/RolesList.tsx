import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { getRolesList, useRoleList } from '../../data';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';

export default function RolesListPage() {
  const navigate = useNavigate();
  const { data: roleListData } = useRoleList();
  return (
    <Container>
      <PageHeader
        pageTitle="Roles"
        action={
          <Button variant="contained" onClick={() => navigate("new")}>
            Create new role
          </Button>
        }
      />
      <Spacer size="lg" />
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={
          <ListSubheader component="div">
            Role Name
          </ListSubheader>
        }
      >
        {roleListData?.map((s) => (
          <ListItem
            disablePadding
            key={s.id}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(s.id)}
          >
            <ListItemButton>
              <ListItemText primary={s.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}