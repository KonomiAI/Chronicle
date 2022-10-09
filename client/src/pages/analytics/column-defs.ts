import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { penniesToPrice } from '../../utils';

export const ACTIVITY_COLUMN_DEFS: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Activity Name',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Unit Price',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.price),
    width: 150,
  },
  {
    field: 'count',
    headerName: 'Count',
    width: 150,
    type: 'number',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.revenue),
  },
];
