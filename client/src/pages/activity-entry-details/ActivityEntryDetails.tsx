import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetActivityEntry } from '../../data/activity-entry';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';

export function ActivityEntryDetails() {
  // get id from route params
  const { id } = useParams();
  if (!id) {
    return <div>TODO page failed to load</div>;
  }
  const { isLoading, data } = useGetActivityEntry(id);
  return (
    <Container>
      {isLoading && <LinearProgress />}
      {data && (
        <>
          <PageHeader pageTitle="Activity Entry" />
          <Spacer size="lg" />
          <Card>
            <CardContent>
              <Typography variant="h5">Customer</Typography>
              <Spacer size="sm" />
              <div>
                {data.customer.firstName} {data.customer.lastName}
              </div>
              <div>
                {data.customer.email} {data.customer.phone}
              </div>
            </CardContent>
          </Card>
          <Spacer size="md" />
          <Card>
            <CardContent>
              <Typography variant="h5">Products &amp; service</Typography>
              <Spacer size="sm" />
              {data.activity && <div>{data.activity.name}</div>}
              {data.products?.map((p) => (
                <div>{p.barcode}</div>
              ))}
            </CardContent>
          </Card>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </Container>
  );
}
