import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { penniesToPrice } from '../../../utils';

export const STAFF_COLUMN_DEFS: GridColDef[] = [
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
    field: 'count',
    headerName: 'Treatment Count',
    type: 'number',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.revenue),
  },
  {
    field: 'activitiesPerformed',
    headerName: 'Activities Performed',
    type: 'number',
  },
  {
    field: 'activitiesRevenue',
    headerName: 'Activities Revenue',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.activitiesRevenue),
  },
  {
    field: 'productsSold',
    headerName: 'Products Sold',
    type: 'number',
  },
  {
    field: 'productsRevenue',
    headerName: 'Products Revenue',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.productsRevenue),
  },
];
