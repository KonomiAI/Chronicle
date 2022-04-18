import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

interface ProductsTableProps {
  tableContents: JSX.Element[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ tableContents }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Barcode</TableCell>
          <TableCell>Archived</TableCell>
          <TableCell>Available</TableCell>
          <TableCell>Created on</TableCell>
          <TableCell>Last updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableContents}</TableBody>
    </Table>
  </TableContainer>
);

export default ProductsTable;
