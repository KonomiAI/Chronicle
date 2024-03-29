import React, { Suspense, useState } from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import DateRangePicker, { DateRange } from './components/DateRangePicker';
import { useStore } from '../../store';
import { Features } from '../../types';
import LoadingCard from '../../components/loading-card';

const ActivityDataGrid = React.lazy(
  () => import('./components/ActivityDataGrid'),
);

const ProductDataGrid = React.lazy(
  () => import('./components/ProductDataGrid'),
);

const CustomerDataGrid = React.lazy(
  () => import('./components/CustomerDataGrid'),
);

const StaffDataGrid = React.lazy(() => import('./components/StaffDataGrid'));

export default function BasicAnalyticsPage() {
  const [startEndDate, setStartEndDate] = useState<DateRange>({
    start: '2021-01-01',
    end: '2022-12-31',
  });
  const { permissions } = useStore();
  return (
    <Container>
      <PageHeader
        pageTitle="Data analytics"
        helpText="A glance of the data in your system"
      />
      <Spacer size="lg" />
      <Card>
        <CardContent>
          <Typography variant="h5">Filter</Typography>
          <Typography variant="caption">
            These filters will be used to aggregate data in the tables below,
            this is useful for calculating revenue and product sales in a period
            of time.
          </Typography>
          <Spacer size="md" />
          <DateRangePicker
            value={startEndDate}
            onChange={(res) => setStartEndDate(res)}
          />
        </CardContent>
      </Card>
      <Spacer size="lg" />
      <Suspense
        fallback={<LoadingCard title="Loading analytics dashboard..." />}
      >
        {permissions[Features.INVENTORY]?.read && (
          <ActivityDataGrid start={startEndDate.start} end={startEndDate.end} />
        )}
        {permissions[Features.INVENTORY]?.read && (
          <ProductDataGrid start={startEndDate.start} end={startEndDate.end} />
        )}
        {permissions[Features.CUSTOMER]?.read && (
          <CustomerDataGrid start={startEndDate.start} end={startEndDate.end} />
        )}
        {permissions[Features.SECURITY]?.read && (
          <StaffDataGrid start={startEndDate.start} end={startEndDate.end} />
        )}
      </Suspense>
    </Container>
  );
}
