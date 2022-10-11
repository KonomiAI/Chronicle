import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Spacer from '../../../components/spacer/Spacer';

import { AnalyticsDataSource, useAnalytics } from '../../../data';
import { DataGridProps } from '../types';
import ChronicleDataGrid from './ChronicleDataGrid';
import { PRODUCT_COLUMN_DEFS } from '../column-defs/product';

export default function ProductDataGrid({ start, end }: DataGridProps) {
  const { data: rows } = useAnalytics({
    source: AnalyticsDataSource.PRODUCT,
    aggregateCols: ['revenue', 'count'],
    start,
    end,
  });
  return rows ? (
    <>
      <Card>
        <CardContent>
          <Typography variant="h3">Products</Typography>
          <Typography variant="caption">
            This is a list of all products in your system as well as the total
            times they were sold and the total revenue they incurred in the
            period set in the filter above.
          </Typography>
        </CardContent>
      </Card>
      <Spacer size="md" />
      <ChronicleDataGrid columns={PRODUCT_COLUMN_DEFS} rows={rows} />
      <Spacer size="lg" />
    </>
  ) : null;
}
