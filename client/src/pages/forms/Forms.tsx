import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import { useGetForms } from '../../data/form';
import { Form } from '../../types/form';

const Forms = () => {
  const navigate = useNavigate();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data: forms } = useGetForms();

  const removeAllowlistEntry = (formId: string) => {
    // TODO: mutation for DELETE
    setIsConfirmDialogOpen(false);
  };

  const generateTableBody = () =>
    forms?.map((form: Form) => (
      <TableRow key={form.id} onClick={() => navigate(form.id)} hover>
        <ConfirmDialog
          dialogTitle="Are you sure you want to remove this Form?"
          open={isConfirmDialogOpen}
          cancelAction={() => {
            setIsConfirmDialogOpen(false);
          }}
          confirmAction={() => {
            removeAllowlistEntry(form.id);
          }}
        />
        <TableCell>
          <Box>
            <Typography variant="h2">{form.title}</Typography>
            <Typography variant="body2">{form.description}</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <IconButton>
            <DeleteIcon onClick={() => setIsConfirmDialogOpen(true)} />
          </IconButton>
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
    </Container>
  );
};

export default Forms;
