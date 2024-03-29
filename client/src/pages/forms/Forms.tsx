import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  LinearProgress,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { useGetForms } from '../../data/form';
import { Form } from '../../types/form';
import { If, usePermission } from '../../components';

const Forms = () => {
  const navigate = useNavigate();
  const { canWrite } = usePermission();
  const { data: forms, isLoading } = useGetForms();

  if (isLoading) {
    return <LinearProgress />;
  }

  const generateListItems = () =>
    forms?.map((form: Form, index) => (
      <Box key={form.id}>
        <ListItemButton
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(form.id)}
        >
          <Stack>
            <Stack direction="row" alignItems="center">
              <Box>
                <Typography variant="h5">{form.title}</Typography>
              </Box>
              <Box marginLeft={1}>
                <If condition={form.purpose}>
                  <Chip
                    size="small"
                    label={form.purpose?.toLowerCase().replace('_', ' ')}
                  />
                </If>
              </Box>
            </Stack>
            <Spacer />
            <Typography variant="body2">{form.description}</Typography>
          </Stack>
        </ListItemButton>
        {index !== forms.length - 1 && <Divider />}
      </Box>
    ));

  return (
    <Container>
      <PageHeader
        pageTitle="Forms"
        helpText="Chronicle custom forms allow you and your organization to collect information in the way you want. You can attach forms to customers, activity entries, inventory items, and staff."
        action={
          <Button
            component={Link}
            to="/forms/create"
            variant="contained"
            disabled={!canWrite}
          >
            Create
          </Button>
        }
      />
      <Spacer size="lg" />
      {forms?.length ? (
        <List component={Paper} sx={{ width: '100%' }}>
          {generateListItems()}
        </List>
      ) : (
        <Alert severity="info">
          You have no forms available, press CREATE to get started
        </Alert>
      )}

      <Spacer size="xl" />
    </Container>
  );
};

export default Forms;
