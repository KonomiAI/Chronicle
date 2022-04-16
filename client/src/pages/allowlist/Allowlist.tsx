import React, { useState } from 'react';
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
} from '@mui/material';

import { useMutation } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import PageHeader from '../../components/page-header/PageHeader';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import Spacer from '../../components/spacer/Spacer';
import AllowlistAdd from './AllowlistAdd';
import { useAllowList, deleteAllowlistEntry } from '../../data';

export default function AllowListPage() {
  const { data: allowListData } = useAllowList();
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
    </Container>
  );
}
