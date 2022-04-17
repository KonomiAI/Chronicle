import React, { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { SaveBar, TextInput, DateInput } from '../../components';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { Customer, CustomerCreateDto, Gender } from '../../types';
import { createCustomer, updateCustomer, useCustomer } from '../../data';
import {
  ErrorPage,
  LoadingPage,
} from '../../components/simple-pages/SimplePages';
import { DATE_REGEXP, EMAIL_REGEXP } from '../../utils';

export interface CustomerDetailsPageProps {
  isCreate?: boolean;
  errorMessage?: string;
  defaultValues: CustomerCreateDto;
  saveChanges: (data: CustomerCreateDto) => void | Promise<void>;
}

const stripAndCleanData = (data: Customer | CustomerCreateDto) => {
  const stripped = (({
    firstName,
    lastName,
    email,
    phone,
    gender,
    dateOfBirth,
  }) => ({
    firstName,
    lastName,
    email,
    phone,
    gender,
    dateOfBirth,
  }))(data);
  stripped.phone = stripped.phone === null ? '' : stripped.phone;
  return stripped;
};

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({
  isCreate,
  defaultValues,
  saveChanges,
  errorMessage,
}) => {
  const { control, watch, handleSubmit } = useForm<CustomerCreateDto>({
    defaultValues: stripAndCleanData(defaultValues),
  });
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  useEffect(() => {
    const subscription = watch(() => setIsSaveOpen(true));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Container>
      <PageHeader
        backURL="/customers"
        pageTitle={
          isCreate
            ? 'New Customer'
            : `${defaultValues.firstName} ${defaultValues.lastName}`
        }
      />
      <Spacer size="lg" />
      {errorMessage && (
        <>
          <Alert severity="error">{errorMessage}</Alert>
          <Spacer size="md" />
        </>
      )}
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
            <Grid item xs={12}>
              <TextInput
                control={control}
                name="email"
                label="Customer Email"
                rules={{ required: true, pattern: EMAIL_REGEXP }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                control={control}
                name="phone"
                label="Customer Phone"
              />
            </Grid>
            <Grid item xs={12}>
              <DateInput
                control={control}
                name="dateOfBirth"
                label="Date of birth"
                rules={{ required: true, pattern: DATE_REGEXP }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="md" />
      <Card>
        <CardContent>
          <Typography variant="h5">Custom forms</Typography>
          <Spacer />
          {isCreate && (
            <Alert severity="info">
              Custom forms are available to this customer once you complete
              their basic information and press save.
            </Alert>
          )}
        </CardContent>
      </Card>
      <SaveBar
        open={isSaveOpen}
        onSave={handleSubmit((res) => {
          setIsSaveOpen(false);
          saveChanges(res);
        })}
      />
    </Container>
  );
};

export function CreateCustomerForm() {
  const navigate = useNavigate();
  const createCustomerAndMutate = useMutation(createCustomer, {
    onSuccess: (data) => {
      navigate(`/customers/${data.data.id}`);
    },
  });
  const doSave = (data: CustomerCreateDto) => {
    createCustomerAndMutate.mutate(data);
  };
  return (
    <CustomerDetailsPage
      isCreate
      defaultValues={{
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: Gender.NOT_SPECIFIED,
        email: '',
        phone: '',
      }}
      saveChanges={doSave}
    />
  );
}

export function ManageCustomerForm() {
  const { id } = useParams();
  if (!id) {
    return <ErrorPage message="Customer ID is not defined" />;
  }
  const { data: currentData, isLoading, refetch } = useCustomer(id);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const updateCustomerAndMutate = useMutation(updateCustomer, {
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      setIsSavingChanges(false);
    },
    onError: () => {
      setErrorMessage(
        "Failed to update the customer's record. Please try again.",
      );
    },
  });

  const doSave = (data: CustomerCreateDto) => {
    setIsSavingChanges(true);
    updateCustomerAndMutate.mutate({
      data,
      id,
    });
  };

  return isLoading || !currentData || isSavingChanges ? (
    <LoadingPage />
  ) : (
    <CustomerDetailsPage
      defaultValues={currentData}
      saveChanges={doSave}
      errorMessage={errorMessage}
    />
  );
}
