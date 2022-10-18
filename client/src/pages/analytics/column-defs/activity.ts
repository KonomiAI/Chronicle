import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { penniesToPrice } from '../../../utils';

export const ACTIVITY_COLUMN_DEFS: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Activity Name',
    width: 200,
  },
  {
    field: 'price',
    headerName: 'Unit Price',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.price),
  },
  {
    field: 'count',
    headerName: 'Count',
    type: 'number',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.revenue),
  },
];
