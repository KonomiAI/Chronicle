import React from 'react';
import { Card, CardContent, Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../components';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { CustomerCreateDto, Gender } from '../../types';

export interface CustomerDetailsPageProps {
  isCreate: boolean;
}

export function CustomerDetailsPage({
  isCreate,
}: Partial<CustomerDetailsPageProps>) {
  const { control } = useForm<CustomerCreateDto>({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: Gender.NOT_SPECIFIED,
      email: '',
      phone: '',
    },
  });
  return (
    <Container>
      <PageHeader pageTitle={isCreate ? 'New Customer' : 'Manage customer'} />
      <Spacer size="lg" />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput
                control={control}
                name="firstName"
                label="First Name"
                rules={{ required: true, min: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={control}
                name="lastName"
                label="Last Name"
                rules={{ required: true, min: 1 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
