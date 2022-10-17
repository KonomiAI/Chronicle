import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ßwillFixThisTypeLater } from '../../../types';
import { getPenniesPriceRange, penniesToPrice } from '../../../utils';

export const PRODUCT_COLUMN_DEFS: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Product Name',
    width: 200,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    valueGetter: (params: GridValueGetterParams) => params.row.brand ?? 'N/A',
  },
  {
    field: 'variantPriceRange',
    headerName: 'Variant Price Range',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      getPenniesPriceRange(
        params.row.variants.map((v: ßwillFixThisTypeLater) => v.price),
      ),
  },
  {
    field: 'variantCount',
    headerName: 'Variants',
    type: 'number',
    valueGetter: (params: GridValueGetterParams) => params.row.variants.length,
  },
  {
    field: 'count',
    headerName: 'Sales',
    type: 'number',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    valueGetter: (params: GridValueGetterParams) =>
      penniesToPrice(params.row.revenue),
  },
];
