import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';

const NotFoundPage = () => (
  <Container maxWidth="sm">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={2}>
        <div>
          <Typography variant="h1">Chronicle</Typography>
        </div>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <div>
                <Typography variant="h3">404: Page not found</Typography>
                <Typography variant="h6">
                  Sorry, but the page you were looking for could not be found.
                </Typography>
              </div>
              <div>
                <Typography>
                  Check the web address and try again or return to the Chronicle{' '}
                  <Link to="/">home page</Link>.
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  </Container>
);

export default NotFoundPage;
