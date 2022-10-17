import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Spacer from '../../../components/spacer/Spacer';

import { AnalyticsDataSource, useAnalytics } from '../../../data';
import { DataGridProps } from '../types';
import ChronicleDataGrid from './ChronicleDataGrid';
import { CUSTOMER_COLUMN_DEFS } from '../column-defs/customer';

export default function CustomerDataGrid({ start, end }: DataGridProps) {
  const { data: rows } = useAnalytics({
    source: AnalyticsDataSource.CUSTOMER,
    aggregateCols: ['revenue', 'count'],
    start,
    end,
  });
  return rows ? (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">Customer</Typography>
          <Typography variant="caption">
            This is a list of all the customer profiles in your system as well
            as the total times they visited your clinic and the total revenue
            they incurred in the period.
          </Typography>
        </CardContent>
      </Card>
      <Spacer size="md" />
      <ChronicleDataGrid columns={CUSTOMER_COLUMN_DEFS} rows={rows} />
      <Spacer size="lg" />
    </>
  ) : null;
}
