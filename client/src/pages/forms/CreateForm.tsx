import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Container, LinearProgress } from '@mui/material';

import { PostFormBody } from '../../types/form';
import { createForm } from '../../data/form';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import FormBase from './FormBase';

const CreateForm = () => {
  const navigate = useNavigate();

  const createFormAndMutate = useMutation(createForm, {
    onSuccess: () => {
      navigate('/forms');
    },
  });

  const saveChanges = (body: PostFormBody) => createFormAndMutate.mutate(body);

  if (createFormAndMutate.isLoading) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <PageHeader pageTitle="Create a form" backURL="/forms" />
      <Spacer size="lg" />
      <FormBase onSave={saveChanges} />
      <Spacer size="lg" />
    </Container>
  );
};

export default CreateForm;
