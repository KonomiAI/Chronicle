import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils';
import { AuthBody } from '../../types';
import Spacer from '../../components/spacer/Spacer';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { control, handleSubmit } = useForm<AuthBody>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginResponse = (err: null | AxiosError) => {
    if (err) {
      setLoading(false);
      setError('Login failed. Double check you email and password combination');
      return;
    }
    navigate('/', { replace: true });
  };

  const loginAction = login(handleLoginResponse);

  const tryLogin = (data: AuthBody) => {
    setLoading(true);
    loginAction.mutate(data);
  };

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
              {error && (
                <>
                  <Alert severity="error">{error}</Alert>
                  <Spacer />
                </>
              )}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    type="email"
                    value={value}
                    onChange={onChange}
                    data-testId="input-username"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={value}
                    onChange={onChange}
                    data-testId="input-password"
                  />
                )}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit(tryLogin)}
                disabled={loading}
                data-testId="btn-login"
              >
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
