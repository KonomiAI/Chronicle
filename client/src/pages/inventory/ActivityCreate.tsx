import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertTitle, Container } from '@mui/material';
import { useSnackbar } from 'notistack';

import { createActivity } from '../../data';
import { PostActivityBody } from '../../types';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ActivityBase from './ActivityBase';

const ActivityCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, isError, mutate } = useMutation(createActivity, {
    onSuccess: (created) => {
      navigate(`/inventory/activities/${created.id}`);
      enqueueSnackbar('Activity created successfully', { variant: 'success' });
    },
  });

  const onSave = (body: PostActivityBody) => {
    mutate(body);
  };

  return (
    <Container>
      <PageHeader
        pageTitle="Create an activity"
        backURL="/inventory?tab=ACTIVITIES"
      />
      <Spacer size="lg" />
      {isError && (
        <>
          <Alert severity="error">
            <AlertTitle>An unexpected error has occurred</AlertTitle>
            Something went wrong while creating an activity
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      <Spacer size="lg" />
      <ActivityBase onSave={onSave} isLoading={isLoading} />
    </Container>
  );
};

export default ActivityCreate;
