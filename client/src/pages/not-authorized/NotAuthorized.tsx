import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Typography } from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';

const NotAuthorizedPage = () => (
  <Container>
    <PageHeader pageTitle="Not Authorized" />
    <Typography variant="h6">
      Sorry, but the page you are trying to access is not allowed.
    </Typography>
    <Spacer size="md" />
    <Typography>
      Think this is a mistake? Try contacting your adminstrator to view your
      current account&apos;s permissions or go back to the{' '}
      <Link to="/">home page</Link>.
    </Typography>
  </Container>
);

export default NotAuthorizedPage;
