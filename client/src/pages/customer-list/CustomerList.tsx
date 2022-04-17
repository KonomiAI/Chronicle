import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { useCustomerList } from '../../data';
import { Customer } from '../../types';
import { dateHelper } from '../../utils';

const CustomerRow: React.FC<{ customer: Customer }> = ({ customer: c }) => {
  const navigate = useNavigate();
  const dob = dateHelper.date(c.dateOfBirth);
  return (
    <TableRow
      key={c.id}
      hover
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate(c.id)}
    >
      <TableCell>
        <Typography variant="h6">
          {c.firstName} {c.lastName}
        </Typography>
      </TableCell>
      <TableCell>{c.email}</TableCell>
      <TableCell>{dateHelper.format(dob, 'fullDate')}</TableCell>
      <TableCell>{c.gender}</TableCell>
    </TableRow>
  );
};

export function CustomerListPage() {
  const { data, isLoading } = useCustomerList();
  const navigate = useNavigate();
  return (
    <Container>
      {isLoading && <LinearProgress />}
      {data && (
        <>
          <PageHeader
            pageTitle="Customers"
            action={
              <Button
                variant="contained"
                data-testid="btn-create-customer"
                onClick={() => navigate('new')}
              >
                New customer
              </Button>
            }
          />
          <Spacer size="lg" />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date of birth</TableCell>
                  <TableCell>Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((c) => (
                  <CustomerRow customer={c} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
