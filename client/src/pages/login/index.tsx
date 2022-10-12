import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import Spacer from '../../components/spacer/Spacer';

import {
  checkIsExpired,
  checkIsLoggedIn,
  clearRememberedUsername,
  clearSession,
  EMAIL_REGEXP,
  getRememberedUsername,
  setRememberedUsername,
  useAuth,
} from '../../utils';
import { AuthBody, UserNoAccessToken } from '../../types';
import FallbackBackground from './assets/fallback_background.png';
import { FormInputField } from '../../components/form-inputs/FormInputField';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(!!getRememberedUsername());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, setFocus } = useForm<AuthBody>({
    defaultValues: {
      email: getRememberedUsername(),
      password: '',
    },
  });

  const goToHome = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (checkIsLoggedIn()) {
      goToHome();
    }

    if (checkIsExpired()) {
      setError('Your session has expired. Please login again to continue.');
      clearSession();
    }

    if (getRememberedUsername()) {
      setFocus('password');
    } else {
      setFocus('email');
    }
  }, []);

  const handleLoginResponse = (
    err: null | AxiosError,
    user: null | UserNoAccessToken,
  ) => {
    if (err) {
      setLoading(false);
      setError('Login failed. Double check you email and password combination');
      return;
    }

    if (rememberMe) {
      setRememberedUsername(user?.email || '');
    } else {
      clearRememberedUsername();
    }

    goToHome();
  };

  const loginAction = login(handleLoginResponse);

  const tryLogin = (data: AuthBody) => {
    setError('');
    setLoading(true);
    loginAction.mutate(data);
  };

  const handleFieldChange = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <Grid
      container
      style={{
        backgroundImage: `url(${FallbackBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Grid item xs={0} lg={8} />
      <Grid item xs={12} lg={4}>
        <Box
          sx={{
            padding: {
              lg: '1em',
            },
          }}
          style={{ height: '100%' }}
        >
          <Card style={{ height: '100%' }}>
            <CardContent
              style={{
                padding: '2em',
              }}
            >
              <form
                onSubmit={handleSubmit(tryLogin)}
                onChange={handleFieldChange}
              >
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
                  <FormInputField
                    name="email"
                    label="Email"
                    type="email"
                    control={control}
                    rules={{
                      required: true,
                      pattern: EMAIL_REGEXP,
                    }}
                  />
                  <FormInputField
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    data-testId="input-password"
                    rules={{
                      required: true,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{
                          padding: 0,
                          marginLeft: '-3px',
                          marginRight: '4px',
                        }}
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                    }
                    label="Remember username"
                  />

                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading}
                    data-testid="btn-login"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
