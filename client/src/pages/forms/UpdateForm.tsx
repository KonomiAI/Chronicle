import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Container, LinearProgress } from '@mui/material';

import { PostFormBody } from '../../types/form';
import { updateForm, useGetForm } from '../../data/form';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import FormBase from './FormBase';

const UpdateForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const id = formId || '';

  const { data: form, isLoading } = useGetForm(id);

  const updateFormAndMutate = useMutation(updateForm, {
    onSuccess: () => {
      navigate('/forms');
    },
  });

  const saveChanges = (body: PostFormBody) =>
    updateFormAndMutate.mutate({ formId: id, data: body });

  if (isLoading || updateFormAndMutate.isLoading) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <PageHeader pageTitle="Update a form" backURL="/forms" />
      <Spacer size="lg" />
      <FormBase formData={form} onSave={saveChanges} />
      <Spacer size="lg" />
    </Container>
  );
};

export default UpdateForm;
