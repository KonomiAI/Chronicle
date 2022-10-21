import React, { useState } from 'react';

import { Redeem, PriceChange } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';

import LoadingCard from '../../components/loading-card';
import Spacer from '../../components/spacer/Spacer';
import { penniesToPrice, formatDate } from '../../utils';
import { createChargeForCustomer, useCustomerBalance } from '../../data';
import CustomerGiftCardDialog from './CustomerGiftCardDialog';
import { useAlertDialog } from '../../components/use-alert';
import ChargeAdjustmentDialog from './ChargeAdjustmentDialog';

export interface CustomerBalanceProps {
  id: string;
}

export default function CustomerBalance({ id }: CustomerBalanceProps) {
  const [openGiftCardDialog, setOpenGiftCardDialog] = useState(false);
  const [openChargeDialog, setOpenChargeDialog] = useState(false);
  const { confirm } = useAlertDialog();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: balanceData, isLoading: isBalanceLoading } =
    useCustomerBalance(id);

  const createChargeAndMutate = useMutation(createChargeForCustomer, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['customer', id, 'balance']);
      setOpenGiftCardDialog(false);
      setOpenChargeDialog(false);
      enqueueSnackbar('Customer balance has been updated', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Customer balance update failed', {
        variant: 'error',
      });
    },
  });
  return (
    <>
      <CustomerGiftCardDialog
        open={openGiftCardDialog}
        onClose={() => setOpenGiftCardDialog(false)}
        onConfirm={async (d) =>
          (await confirm({
            title: `Confirm gift card reload of ${penniesToPrice(
              d.amount * 100,
            )}?`,
          })) &&
          createChargeAndMutate.mutate({
            id,
            body: { ...d, amount: -d.amount * 100 },
          })
        }
      />
      <ChargeAdjustmentDialog
        open={openChargeDialog}
        onClose={() => setOpenChargeDialog(false)}
        onConfirm={async (d, a) =>
          (await confirm({
            title: `Confirm ${a} balance adjustment of ${penniesToPrice(
              d.amount * 100,
            )}?`,
          })) &&
          createChargeAndMutate.mutate({
            id,
            body: { ...d, amount: d.amount * 100 },
          })
        }
      />
      <Card>
        <CardContent>
          <Typography variant="h5">Balance &amp; transactions</Typography>
          <Spacer size="md" />
          {isBalanceLoading && <LoadingCard title="Crunching the numbers..." />}
          {balanceData && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column-reverse',
                    }}
                  >
                    <Typography>Current Balance</Typography>
                    <Typography component="div" variant="h3">
                      {penniesToPrice(-balanceData.balance)}
                    </Typography>
                  </CardContent>
                </Card>
                <Spacer size="md" />
                <Card variant="outlined">
                  <CardContent sx={{ pb: 0 }}>
                    <Typography variant="h6">Actions</Typography>
                  </CardContent>
                  <List>
                    <ListItemButton onClick={() => setOpenGiftCardDialog(true)}>
                      <ListItemIcon>
                        <Redeem />
                      </ListItemIcon>
                      <ListItemText primary="Gift card deposit" />
                    </ListItemButton>
                    <ListItemButton onClick={() => setOpenChargeDialog(true)}>
                      <ListItemIcon>
                        <PriceChange />
                      </ListItemIcon>
                      <ListItemText primary="Balance adjustment" />
                    </ListItemButton>
                  </List>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Transaction Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Staff</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Activity Entry</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {balanceData.charges.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>{formatDate(c.createdDt)}</TableCell>
                          <TableCell>{penniesToPrice(-c.amount)}</TableCell>
                          <TableCell>
                            <Link to={`/staff/${c.createdBy.id}`}>
                              {c.createdBy.firstName} {c.createdBy.lastName}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {c.description || 'No description'}
                          </TableCell>
                          <TableCell>
                            {c.activityEntry && (
                              <Link
                                to={`/activity-entries/${c.activityEntry.id}`}
                              >
                                View
                              </Link>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}
