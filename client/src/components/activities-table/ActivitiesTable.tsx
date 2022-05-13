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

interface ActivitiesTableProps {
  tableContents: JSX.Element[];
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ tableContents }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Archived</TableCell>
            <TableCell>Created on</TableCell>
            <TableCell>Last updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableContents}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivitiesTable;
