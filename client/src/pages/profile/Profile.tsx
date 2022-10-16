import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { FormInputField } from '../../components/form-inputs/FormInputField';
import { ResetPasswordData } from '../../types';
import Spacer from '../../components/spacer/Spacer';
import { useStore } from '../../store';
import { buildResetPasswordBody } from './utils';
import { resetPassword } from '../../data/auth';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { control, handleSubmit, watch } = useForm<ResetPasswordData>();
  const { user } = useStore();
  const password = useRef('');

  password.current = watch('password', '') || '';

  const resetPasswordAndMutate = useMutation(resetPassword, {
    onSuccess: () => {
      setIsSuccess(true);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      setError(
        'Request to update password failed. Please try again at a later time.',
      );
    },
  });

  const tryUpdate = (data: ResetPasswordData) => {
    if (user?.id) {
      setIsSuccess(false);
      setError('');
      setIsLoading(true);
      resetPasswordAndMutate.mutate(buildResetPasswordBody(data));
    } else {
      setError('Unexpected error: User ID not found.');
    }
  };

  return (
    <Container>
      <Typography variant="h1">Profile</Typography>
      <Typography variant="body2">
        In this area you will be able to customize your personal settings.
      </Typography>
      <Card sx={{ my: 4 }}>
        <CardContent>
          <Typography variant="h4">Change password</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            In this section you will be able to choose your personalized
            password
          </Typography>
          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" sx={{ my: 2 }}>
              Password successfully changed.
            </Alert>
          )}
          <FormInputField
            type="password"
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            }}
            label="New password"
          />
          <Spacer size="md" />
          <FormInputField
            type="password"
            name="confirmPassword"
            control={control}
            rules={{
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            }}
            label="Confirm password"
          />
          <Spacer size="md" />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <LoadingButton
              onClick={handleSubmit(tryUpdate)}
              loading={isLoading}
            >
              Change
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
