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
                <Typography variant="h4">Sign in to Chronicle</Typography>
                <Typography>Enter your details below</Typography>
              </div>
              <TextField id="username" label="Username" variant="outlined" />
              <TextField id="password" label="Password" variant="outlined" />
              <Button variant="contained">Login</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
