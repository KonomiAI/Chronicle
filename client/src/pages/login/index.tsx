import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: '2em',
        }}
      >
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <div>
                <Typography variant="h3">Sign in to Chronicle</Typography>
                <Typography>Enter your details below</Typography>
              </div>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                type="email"
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
              />
              <Button variant="contained" size="large">
                Login
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
