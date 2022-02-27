import React from 'react';
import {
  Box,
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
  Typography,
} from '@mui/material';
import PageHeader from '../../components/page-header/PageHeader';

export default function StaffListPage() {
  return (
    <Container>
      <PageHeader
        pageTitle="Staff"
        action={<Button variant="contained">Invite</Button>}
      />
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
            <TableRow hover>
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
