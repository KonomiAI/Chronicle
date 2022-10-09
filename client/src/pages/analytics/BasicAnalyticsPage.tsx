import React from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { ACTIVITY_COLUMN_DEFS } from './column-defs';
import { AnalyticsDataSource, useAnalytics } from '../../data';

export default function BasicAnalyticsPage() {
  const { data: rows } = useAnalytics({
    source: AnalyticsDataSource.ACTIVITY,
    aggregateCols: ['revenue', 'count'],
    start: '2021-01-01',
    end: '2022-12-31',
  });
  return (
    <Container>
      <PageHeader
        pageTitle="Data analytics"
        helpText="A glance of the data in your system"
      />
      <Spacer size="lg" />
      {rows && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={ACTIVITY_COLUMN_DEFS}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </div>
      )}
    </Container>
  );
}
