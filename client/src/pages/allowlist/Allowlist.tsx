import React, { useState } from 'react';
import { useMutation } from 'react-query';

import {
  Box,
  Button,
  IconButton,
  Container,
  Paper,
  Typography,
  Dialog,
  List,
  ListItem,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import PageHeader from '../../components/page-header/PageHeader';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import Spacer from '../../components/spacer/Spacer';
import LoadingCard from '../../components/loading-card';
import AllowlistAdd from './AllowlistAdd';
import { useAllowList, deleteAllowlistEntry } from '../../data';

export default function AllowListPage() {
  const { data: allowListData, isLoading, isError } = useAllowList();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const removeAllowlistEntryAndMutate = useMutation(deleteAllowlistEntry, {
    onSuccess: () => {
      window.location.reload();
    },
  });

  const removeAllowlistEntry = (allowlistEntryId: string) => {
    removeAllowlistEntryAndMutate.mutate(allowlistEntryId);
    setConfirmDeleteDialogOpen(false);
  };

  const renderContent = () => {
    if (isError || !allowListData) {
      return (
        <Alert severity="error">
          <AlertTitle>An unexpected error has occured</AlertTitle>
          Something went wrong while fetching IP addresses
        </Alert>
      );
    }

    if (allowListData.length === 0) {
      return (
        <Alert severity="info">
          <AlertTitle>No IP Addresses found</AlertTitle>
          Please use the &quot;add new&quot; button to add an IP address to the
          allowlist
        </Alert>
      );
    }

    return (
      <List
        component={Paper}
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        {allowListData?.map((s, index) => (
          <>
            <ListItem
              key={s.id}
              secondaryAction={
                <IconButton onClick={() => setConfirmDeleteDialogOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ConfirmDialog
                dialogTitle="Are you sure you want to remove this IP Address?"
                open={confirmDeleteDialogOpen}
                cancelAction={() => {
                  setConfirmDeleteDialogOpen(false);
                }}
                confirmAction={() => {
                  removeAllowlistEntry(s.id);
                }}
              />
              <Box>
                <Typography variant="h2">{s.ip}</Typography>
                <Typography variant="body2">{s.description}</Typography>
              </Box>
            </ListItem>
            {index !== allowListData.length - 1 && <Divider />}
          </>
        ))}
      </List>
    );
  };

  if (isLoading) {
    return <LoadingCard title="Fetching IP Addresses..." />;
  }

  return (
    <Container>
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <AllowlistAdd handleClose={() => setAddDialogOpen(false)} />
      </Dialog>
      <PageHeader
        pageTitle="IP Allowlist"
        helpText="Add IP address to the allowlist to ensure your staff member can only access
        the application from certain locations"
        action={
          <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
            Add New
          </Button>
        }
      />
      <Spacer size="lg" />
      {renderContent()}
    </Container>
  );
}
