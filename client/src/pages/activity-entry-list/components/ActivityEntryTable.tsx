import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Chip,
  Avatar,
  Alert,
} from '@mui/material';
import { format, parseJSON } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ActivityEntry } from '../../../types/activity-entry';

export interface ActivityEntryTableProps {
  data: ActivityEntry[];
}

export function ActivityEntryTable({ data }: ActivityEntryTableProps) {
  const navigate = useNavigate();
  if (!data.length) {
    return (
      <Alert severity="info">
        No activity entries found. You can create one by clicking on New Entry
      </Alert>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Last updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow
              key={d.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(d.id)}
            >
              <TableCell>
                <Tooltip title={format(parseJSON(d.createdAt), 'PPPpp')}>
                  <div>{format(parseJSON(d.createdAt), 'PP')}</div>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Chip
                  clickable
                  avatar={
                    <Avatar>{d.customer.firstName.substring(0, 1)}</Avatar>
                  }
                  label={`${d.customer.firstName} ${d.customer.lastName}`}
                />
              </TableCell>
              <TableCell>
                <Chip
                  clickable
                  avatar={<Avatar>{d.author.firstName.substring(0, 1)}</Avatar>}
                  label={`${d.author.firstName} ${d.author.lastName}`}
                />
              </TableCell>
              <TableCell>{d.activity?.name ?? 'N/A'}</TableCell>
              <TableCell>
                <Chip clickable label={`${d.products?.length ?? 0} variants`} />
              </TableCell>
              <TableCell>
                <Tooltip title={format(parseJSON(d.updatedAt), 'PPPpp')}>
                  <div>{format(parseJSON(d.updatedAt), 'PP')}</div>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
