import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Container,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import LoadingCard from '../../components/loading-card';
import StaffInviteDialog from './StaffInvite';
import { useStaffList } from '../../data';

export default function StaffListPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useStaffList();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const renderContent = () => {
    if (isError || !data) {
      return (
        <Alert severity="error">
          <AlertTitle>An unexpected error has occured</AlertTitle>
          Something went wrong while fetching staff members
        </Alert>
      );
    }

    if (data.length === 0) {
      return (
        <Alert severity="info">
          <AlertTitle>No staff members found</AlertTitle>
          Please use the invite button to create your first staff member
        </Alert>
      );
    }

    /*
      Currently we are using a table to list all staff members
      but that may not be the best solution due to limited responsiveness. 
      We can deliver this for now and look for an alternative solution
      in the next iteration (Display grid or just a plain list list Shopify)
    */
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((s) => (
              <TableRow
                key={s.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(s.id)}
              >
                <TableCell>
                  {s.firstName} {s.lastName}
                </TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>
                  {s.roles.map((r) => (
                    <Chip key={r.id} label={r.name} sx={{ mr: 1 }} />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (isLoading) {
    return <LoadingCard title="Fetching staff members..." />;
  }

  return (
    <Container>
      <Dialog
        open={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
      >
        <StaffInviteDialog handleClose={() => setInviteDialogOpen(false)} />
      </Dialog>
      <PageHeader
        pageTitle="Staff"
        action={
          <Button
            variant="contained"
            data-testid="btn-staff-invite-dialog"
            onClick={() => setInviteDialogOpen(true)}
          >
            Invite
          </Button>
        }
      />
      <Spacer size="lg" />
      {renderContent()}
    </Container>
  );
}
