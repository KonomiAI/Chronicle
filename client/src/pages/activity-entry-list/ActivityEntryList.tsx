import React from 'react';
import {
  Avatar,
  Button,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { format, parseJSON } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { useListActivityEntries } from '../../data/activity-entry';

export function ActivityEntryList() {
  const { isLoading, data } = useListActivityEntries();
  const navigate = useNavigate();
  return (
    <Container>
      {isLoading && <LinearProgress />}

      {data && (
        <>
          <PageHeader
            pageTitle="Activity Entries"
            action={
              <Button variant="contained" data-testid="btn-create-entry">
                New Entry
              </Button>
            }
          />
          <Spacer size="lg" />
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
                          <Avatar>
                            {d.customer.firstName.substring(0, 1)}
                          </Avatar>
                        }
                        label={`${d.customer.firstName} ${d.customer.lastName}`}
                      />
                    </TableCell>
                    <TableCell>Yonglin Wang</TableCell>
                    <TableCell>{d.activity?.name ?? 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        clickable
                        label={`${d.products?.length ?? 0} variants`}
                      />
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
        </>
      )}
    </Container>
  );
}
