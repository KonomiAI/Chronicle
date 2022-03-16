import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getRolesList, useRoleList } from '../../data';
import {
  Button,
  Container,
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

export default function RolesListPage() {
  const navigate = useNavigate();
  const { data: roleListData } = useRoleList();
  return (
    <Container>
      <PageHeader
        pageTitle="Roles"
        action={
          <Button variant="contained" onClick={() => navigate('create')}>
            Create new role
          </Button>
        }
      />
      <Spacer size="lg" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleListData?.map((s) => (
              <TableRow
                key={s.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(s.id)}
              >
                <TableCell>{s.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
