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
import { useParams } from 'react-router-dom';
import { SaveBar, TextInput } from '../../components';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { CustomerCreateDto, Gender } from '../../types';
import { useCustomer } from '../../data';
import {
  ErrorPage,
  LoadingPage,
} from '../../components/simple-pages/SimplePages';
import { EMAIL_REGEXP } from '../../utils';

export interface CustomerDetailsPageProps {
  isCreate?: boolean;
  defaultValues: CustomerCreateDto;
  saveChanges: (data: CustomerCreateDto) => void | Promise<void>;
}

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({
  isCreate,
  defaultValues,
  saveChanges,
}) => {
  const { control, watch, handleSubmit } = useForm<CustomerCreateDto>({
    defaultValues,
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
  const doSave = (data: CustomerCreateDto) => {
    console.log(data);
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
  const { data: currentData, isLoading } = useCustomer(id);
  const doSave = (data: CustomerCreateDto) => {
    console.log(data);
  };

  return isLoading || !currentData ? (
    <LoadingPage />
  ) : (
    <CustomerDetailsPage defaultValues={currentData} saveChanges={doSave} />
  );
}
