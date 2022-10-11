import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { penniesToPrice } from '../../../utils';

export const CUSTOMER_COLUMN_DEFS: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 200,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'count',
    headerName: 'Visits',
    type: 'number',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.revenue),
  },
];
