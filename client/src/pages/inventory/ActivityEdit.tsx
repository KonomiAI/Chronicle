import React from 'react';
import { useMutation } from 'react-query';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import { deleteActivity, updateActivity, useGetActivity } from '../../data';
import { InventoryTabs, PutActivityBody } from '../../types';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ActivityBase from './ActivityBase';
import LoadingCard from '../../components/loading-card';
import { LoadingButton } from '@mui/lab';

const ActivityEdit = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();

  const id = activityId || '';

  const { data: activity, isLoading, isError } = useGetActivity(id);

  const {
    isLoading: isDeleteActivityLoading,
    isError: hasDeleteActivityError,
    mutate: mutateDeleteActivity,
  } = useMutation(deleteActivity, {
    onSuccess: () => {
      navigate({
        pathname: '/inventory',
        search: createSearchParams({
          tab: 'ACTIVITIES',
        }).toString(),
      });
    },
  });

  const {
    isLoading: isUpdateActivityLoading,
    isError: hasUpdateActivityError,
    mutate: mutateUpdateActivity,
  } = useMutation(updateActivity, {
    onSuccess: () => {
      navigate({
        pathname: '/inventory',
        search: createSearchParams({
          tab: 'ACTIVITIES',
        }).toString(),
      });
    },
  });

  const onSave = (body: PutActivityBody) => {
    mutateUpdateActivity({ activityId: id, data: body });
  };

  if (isLoading) {
    return <LoadingCard title="Fetching activity..." />;
  }

  if (isError || !activity) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>An unexpected error has occured</AlertTitle>
          Something went wrong while fetching an activity
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        pageTitle="Update an activity"
        backURL="/inventory?tab=ACTIVITIES"
      />
      <Spacer size="lg" />
      {hasUpdateActivityError && (
        <>
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while updating an activity
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      <Spacer size="lg" />
      <ActivityBase
        activity={activity}
        onSave={onSave}
        isLoading={isUpdateActivityLoading}
      />
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
            Danger Zone
          </Typography>
          {hasDeleteActivityError && (
            <>
              <Alert severity="error">
                <AlertTitle>An unexpected error has occured</AlertTitle>
                Something went wrong while deleting an activity
              </Alert>
              <Spacer size="lg" />
            </>
          )}
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h6">Delete this activity</Typography>
              <Typography variant="body2">
                Deleting this activity will remove any association from the
                inventory view.
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingButton
                loading={isDeleteActivityLoading}
                variant="text"
                color="error"
                onClick={() => {
                  mutateDeleteActivity(id);
                }}
              >
                Delete
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="lg" />
    </Container>
  );
};

export default ActivityEdit;
