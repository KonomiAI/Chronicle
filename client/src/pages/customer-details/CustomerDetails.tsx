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
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import { SaveBar, DateInput, If, GenderSelect } from '../../components';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import {
  Customer,
  CustomerCreateDto,
  FormPurpose,
  FormResponse,
  Gender,
  SimpleResponse,
} from '../../types';
import { createCustomer, updateCustomer, useCustomer } from '../../data';
import {
  ErrorPage,
  LoadingPage,
} from '../../components/simple-pages/SimplePages';
import { DATE_REGEXP, EMAIL_REGEXP } from '../../utils';
import { FormIntegration } from '../../components/form-integration/form-integration';
import CustomerBalance from './CustomerBalance';
import { FormInputField } from '../../components/form-inputs/FormInputField';

export interface CustomerDetailsPageProps {
  isCreate?: boolean;
  errorMessage?: string;
  defaultValues: CustomerCreateDto;
  responses?: FormResponse[];
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
  responses,
}) => {
  const { control, watch, handleSubmit } = useForm<CustomerCreateDto>({
    defaultValues: stripAndCleanData(defaultValues),
  });
  const [isSaveOpen, setIsSaveOpen] = useState(false);

  const handleCustomFieldUpdate = (res: SimpleResponse) => {
    saveChanges({
      ...stripAndCleanData(defaultValues),
      responseIds: [...(responses?.map((r) => r.id) ?? []), res.id],
    });
  };

  const handleCustomFieldRemove = (responseId: string) => {
    saveChanges({
      ...stripAndCleanData(defaultValues),
      responseIds: (responses?.map((r) => r.id) ?? []).filter(
        (id) => id !== responseId,
      ),
    });
  };

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
              <FormInputField
                control={control}
                name="firstName"
                label="First Name"
                rules={{ required: true, min: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInputField
                control={control}
                name="lastName"
                label="Last Name"
                rules={{ required: true, min: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputField
                control={control}
                name="email"
                label="Customer Email"
                rules={{ required: true, pattern: EMAIL_REGEXP }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputField
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
            <Grid item xs={12}>
              <GenderSelect control={control} name="gender" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="md" />
      <Card>
        <CardContent>
          <Typography variant="h5">Custom forms</Typography>
          <Spacer />
          <If
            condition={isCreate}
            el={
              <FormIntegration
                responses={responses ?? []}
                purpose={FormPurpose.CUSTOMER}
                onResponseSaved={handleCustomFieldUpdate}
                onResponseDeleted={handleCustomFieldRemove}
              />
            }
          >
            <Alert severity="info">
              Custom forms are available to this customer once you complete
              their basic information and press save.
            </Alert>
          </If>
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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const createCustomerAndMutate = useMutation(createCustomer, {
    onSuccess: async ({ data }) => {
      navigate(`/customers/${data.id}`);
      enqueueSnackbar('Customer profile created successfully', {
        variant: 'success',
      });
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
  const client = useQueryClient();
  const { data: currentData, isLoading } = useCustomer(id);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const updateCustomerAndMutate = useMutation(updateCustomer, {
    onSuccess: async () => {
      await client.invalidateQueries(['customer', id]);
      enqueueSnackbar('Customer profile updated successfully', {
        variant: 'success',
      });
      setIsSavingChanges(false);
    },
    onError: () => {
      setErrorMessage(
        "Failed to update the customer's record. Please try again.",
      );
      setIsSavingChanges(false);
    },
  });

  const doSave = (data: CustomerCreateDto) => {
    setIsSavingChanges(true);
    setErrorMessage('');
    updateCustomerAndMutate.mutate({
      data,
      id,
    });
  };

  return isLoading || !currentData || isSavingChanges ? (
    <LoadingPage />
  ) : (
    <>
      <CustomerDetailsPage
        defaultValues={currentData}
        saveChanges={doSave}
        responses={currentData.responses}
        errorMessage={errorMessage}
      />
      <Container>
        <Spacer size="md" />
        <CustomerBalance id={id} />
      </Container>
      <Spacer size="saveBar" />
    </>
  );
}
