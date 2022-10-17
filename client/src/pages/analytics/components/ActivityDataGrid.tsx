import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Spacer from '../../../components/spacer/Spacer';

import { AnalyticsDataSource, useAnalytics } from '../../../data';
import { DataGridProps } from '../types';
import ChronicleDataGrid from './ChronicleDataGrid';
import { ACTIVITY_COLUMN_DEFS } from '../column-defs/activity';

export default function ActivityDataGrid({ start, end }: DataGridProps) {
  const { data: rows } = useAnalytics({
    source: AnalyticsDataSource.ACTIVITY,
    aggregateCols: ['revenue', 'count'],
    start,
    end,
  });
  return rows ? (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">Activities</Typography>
          <Typography variant="caption">
            This is a list of all activities in your system as well as the total
            times they were performed and the total revenue they incurred in the
            period set in the filter above.
          </Typography>
        </CardContent>
      </Card>
      <Spacer size="md" />
      <ChronicleDataGrid columns={ACTIVITY_COLUMN_DEFS} rows={rows} />
      <Spacer size="lg" />
    </>
  ) : null;
}
