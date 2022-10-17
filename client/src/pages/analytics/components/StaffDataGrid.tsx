import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Spacer from '../../../components/spacer/Spacer';

import { AnalyticsDataSource, useAnalytics } from '../../../data';
import { DataGridProps } from '../types';
import ChronicleDataGrid from './ChronicleDataGrid';
import { STAFF_COLUMN_DEFS } from '../column-defs/staff';

export default function ActivityDataGrid({ start, end }: DataGridProps) {
  const { data: rows } = useAnalytics({
    source: AnalyticsDataSource.STAFF,
    aggregateCols: [
      'revenue',
      'count',
      'activitiesPerformed',
      'activitiesRevenue',
      'productsSold',
      'productsRevenue',
    ],
    start,
    end,
  });
  return rows ? (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">Staff</Typography>
          <Typography variant="caption">
            This is a list of all your staff in your system as well as the
            number of visits they handled, the revenue they brought in, and a
            breakdown of revenue sources.
          </Typography>
        </CardContent>
      </Card>
      <Spacer size="md" />
      <ChronicleDataGrid columns={STAFF_COLUMN_DEFS} rows={rows} />
      <Spacer size="lg" />
    </>
  ) : null;
}
