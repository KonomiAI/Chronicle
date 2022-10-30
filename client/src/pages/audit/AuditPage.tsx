import React from 'react';
import {
  Alert,
  AlertTitle,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import AuditRow from '../../components/audit-row';
import LoadingCard from '../../components/loading-card';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { useAudit } from '../../data';
import { Audit } from '../../types';

const AuditTable = () => {
  const { data, isLoading, isError } = useAudit();

  if (isLoading) {
    return <LoadingCard title="Fetching audit log..." />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>An unexpected error has occured</AlertTitle>
        Something went wrong while fetching the audit log.
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Captured At</TableCell>
            <TableCell>Staff</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((audit: Audit) => (
            <AuditRow key={audit.id} audit={audit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AuditPage = () => (
  <Container>
    <PageHeader
      pageTitle="Audit log"
      helpText="View details on staff access points"
    />
    <Spacer size="md" />
    <Alert severity="info">
      Only the last 100 audit log entries are displayed. To view more details
      please contact support.
    </Alert>
    <Spacer size="md" />
    <AuditTable />
  </Container>
);

export default AuditPage;
