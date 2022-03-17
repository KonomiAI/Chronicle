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


export default function InventoryTable({
  tableContents,
}: {
  tableContents: JSX.Element[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Date Barcode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableContents}</TableBody>
      </Table>
    </TableContainer>
  );
}
