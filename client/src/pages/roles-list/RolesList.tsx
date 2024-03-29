import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import LoadingCard from '../../components/loading-card';
import { useRoleList } from '../../data';
import { usePermission } from '../../components';

export default function RolesListPage() {
  const navigate = useNavigate();
  const { canWrite } = usePermission();
  const { data: roleListData, isLoading, isError } = useRoleList();

  const renderContent = () => {
    if (isError || !roleListData) {
      return (
        <Alert severity="error">
          <AlertTitle>An unexpected error has occured</AlertTitle>
          Something went wrong while fetching roles
        </Alert>
      );
    }

    if (roleListData.length === 0) {
      return (
        <Alert severity="info">
          <AlertTitle>No roles found</AlertTitle>
          Please use the &quot;create new role&quot; button to create your first
          role
        </Alert>
      );
    }

    return (
      <List
        component={Paper}
        data-testid="roles-list"
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={<ListSubheader component="div">Role Name</ListSubheader>}
      >
        {roleListData?.map((s) => (
          <ListItem
            disablePadding
            key={s.id}
            sx={{ cursor: 'pointer' }}
            data-testid={`role-list-item-${s.id}`}
          >
            <ListItemButton onClick={() => navigate(s.id)}>
              <ListItemText primary={s.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  if (isLoading) {
    return <LoadingCard title="Fetching roles..." />;
  }

  return (
    <Container>
      <PageHeader
        pageTitle="Roles"
        action={
          <Button
            variant="contained"
            onClick={() => navigate('new')}
            disabled={!canWrite}
          >
            Create new role
          </Button>
        }
      />
      <Spacer size="lg" />
      {renderContent()}
    </Container>
  );
}
