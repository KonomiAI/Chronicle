import React from 'react';
import { Alert, Container, LinearProgress } from '@mui/material';

export const LoadingPage = () => (
  <Container>
    <LinearProgress />
  </Container>
);

export const ErrorPage: React.FC<{ message: string }> = ({ message }) => (
  <Container>
    <Alert severity="error">{message}</Alert>
  </Container>
);
