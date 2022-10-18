import React from 'react';
import { GridColDef, GridToolbar, DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { ßwillFixThisTypeLater } from '../../../types';

export interface ChronicleDataGridProps {
  rows: ßwillFixThisTypeLater[];
  columns: GridColDef[];
}

const ChronicleDataGrid: React.FC<ChronicleDataGridProps> = ({
  columns,
  rows,
}) => (
  <Card>
    <DataGrid
      rows={rows}
      components={{ Toolbar: GridToolbar }}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10, 20, 50, 100]}
      autoHeight
      checkboxSelection={false}
      disableSelectionOnClick
    />
  </Card>
);

export default ChronicleDataGrid;
