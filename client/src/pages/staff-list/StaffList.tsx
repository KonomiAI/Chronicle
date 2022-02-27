import React from 'react';
import {
  Button,
  Chip,
  Container,
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

export default function StaffListPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <PageHeader
        pageTitle="Staff"
        action={<Button variant="contained">Invite</Button>}
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
