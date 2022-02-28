import React, { useState } from 'react';
import {
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
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import StaffInviteDialog from './StaffInvite';

export default function StaffListPage() {
  const navigate = useNavigate();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
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
          <Button variant="contained" onClick={() => setInviteDialogOpen(true)}>
            Invite
          </Button>
        }
      />
      <Spacer size="lg" />
      {/* 
          Currently we are using a table to list all staff members
          but that may not be the best solution due to limited responsiveness. 
          We can deliver this for now and look for an alternative solution
          in the next iteration (Display grid or just a plain list list Shopify)
      */}
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
            <TableRow
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('somestaffid')}
            >
              <TableCell>Daniel Wu</TableCell>
              <TableCell>wuonlabs@gmail.com</TableCell>
              <TableCell>
                <Chip label="Masseuse" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
