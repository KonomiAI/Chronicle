import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { useGetForms } from '../../data/form';
import { Form } from '../../types/form';

const Forms = () => {
  const navigate = useNavigate();
  const { data: forms, isLoading } = useGetForms();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (forms === undefined || forms.length === 0) {
    return <div>No forms found.</div>;
  }

  const generateTableBody = () =>
    forms?.map((form: Form) => (
      <TableRow key={form.id} onClick={() => navigate(form.id)} hover>
        <TableCell>
          <Box>
            <Stack direction="row" alignItems="center">
              <Box>
                <Typography variant="h2">{form.title}</Typography>
              </Box>
              <Box marginLeft={1}>
                <Chip
                  size="small"
                  label={form.purpose.toLowerCase().replace('_', ' ')}
                />
              </Box>
            </Stack>
            <Typography variant="body2">{form.description}</Typography>
          </Box>
        </TableCell>
      </TableRow>
    ));

  return (
    <Container>
      <PageHeader
        pageTitle="Forms"
        helpText="Create, edit, or delete a form"
        action={
          <Button component={Link} to="/forms/create" variant="contained">
            Create
          </Button>
        }
      />
      <Spacer size="lg" />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{generateTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <Spacer size="lg" />
    </Container>
  );
};

export default Forms;
