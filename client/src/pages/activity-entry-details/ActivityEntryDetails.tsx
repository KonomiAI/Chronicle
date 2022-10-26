import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import {
  ActivityCard,
  CustomerCard,
  If,
  usePermission,
} from '../../components';
import { FormIntegration } from '../../components/form-integration/form-integration';
import { FormPurpose } from '../../types';
import { CustomerSelectDialog } from '../../components/customer-select-dialog/CustomerSelectDialog';
import { ActivityEntryDto, ChargeCreateDto } from '../../types/activity-entry';
import { ActivitySelectDialog } from '../../components/activity-select-dialog/ActivitySelectDialog';
import {
  createActivityEntryCharge,
  updateActivityEntry,
  useGetActivityEntry,
} from '../../data';
import { ProductPickerDialog } from '../../components/procuct-picker-dialog/ProductPickerDialog';
import { penniesToPrice } from '../../utils';
import { useAlertDialog } from '../../components/use-alert';
import ActivityEntryChargeDialog from './ActivityEntryChargeDialog';

export function ActivityEntryDetails() {
  // get id from route params
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { confirm } = useAlertDialog();
  const [openCustomerSelectDialog, setOpenCustomerSelectDialog] =
    useState(false);
  const [openActivitySelectDialog, setOpenActivitySelectDialog] =
    useState(false);
  const [openProductSelectDialog, setOpenProductSelectDialog] = useState(false);
  const [openChargeDialog, setOpenChargeDialog] = useState(false);
  const { canWrite } = usePermission();
  if (!id) {
    return <div>TODO page failed to load</div>;
  }

  const updateEntryAndMutate = useMutation(updateActivityEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['activity-entry', id]);
      await queryClient.invalidateQueries(['chargeInfo', id]);
      enqueueSnackbar('Activity entry updated!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Failed to update activity entry', {
        variant: 'error',
      });
    },
  });

  const createChargeAndMutate = useMutation(createActivityEntryCharge, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['activity-entry', id]);
      setOpenChargeDialog(false);
      enqueueSnackbar('Charge created! Customer balance has been updated', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Failed to create charge, try again later.', {
        variant: 'error',
      });
    },
  });

  const { isLoading, data } = useGetActivityEntry(id);

  const baseUpdateBody: ActivityEntryDto = {
    customerId: data?.customer.id ?? '',
    activityId: data?.activity?.id,
    variantId: data?.products?.map((p) => p.id),
    responseIds: data?.responses?.map((r) => r.id),
  };

  const hasChargableItems = data?.products?.length || data?.activity;
  const shouldDisableEdit = !canWrite || !!data?.charge?.length;

  const placeCharge = async (chargeData: ChargeCreateDto) =>
    data &&
    (await confirm({
      title: `Confirm charge for ${data.customer.firstName}?`,
      message: 'This action is irreversible.',
    })) &&
    createChargeAndMutate.mutate({
      chargeData: {
        ...chargeData,
        tipAmount: Math.round(chargeData.tipAmount),
      },
      id: data.id,
    });

  return (
    <Container>
      <CustomerSelectDialog
        open={openCustomerSelectDialog}
        handleClose={(c) => {
          setOpenCustomerSelectDialog(false);
          if (c) {
            updateEntryAndMutate.mutate({
              id,
              activityEntry: { ...baseUpdateBody, customerId: c?.id },
            });
          }
        }}
      />
      <ActivitySelectDialog
        open={openActivitySelectDialog}
        handleClose={(a) => {
          setOpenActivitySelectDialog(false);
          if (a) {
            updateEntryAndMutate.mutate({
              id,
              activityEntry: { ...baseUpdateBody, activityId: a?.id },
            });
          }
        }}
      />
      {data && (
        <ActivityEntryChargeDialog
          open={openChargeDialog}
          onClose={() => setOpenChargeDialog(false)}
          onConfirm={placeCharge}
          entry={data}
        />
      )}
      <ProductPickerDialog
        open={openProductSelectDialog}
        handleClose={(products) => {
          setOpenProductSelectDialog(false);
          if (products?.length) {
            updateEntryAndMutate.mutate({
              id,
              activityEntry: {
                ...baseUpdateBody,
                variantId: [
                  ...(baseUpdateBody.variantId ?? []),
                  ...products.map((p) => p.id),
                ],
              },
            });
          }
        }}
      />
      {isLoading && <LinearProgress />}
      {data && !isLoading && (
        <>
          <PageHeader
            pageTitle={`Activity Entry - ${format(
              parseJSON(data.createdAt),
              'PP',
            )}`}
            helpText={`Last edited by ${data.author.firstName} ${data.author.lastName}`}
          />
          <Spacer size="lg" />
          {!!data.charge.length && (
            <>
              <Alert severity="info">
                This activity entry has been charged. The customer, activity,
                and product info may no longer be updated. You may still change
                the custom forms.
              </Alert>
              <Spacer size="md" />
            </>
          )}
          <Card>
            <CardContent>
              <Typography variant="h5">Customer</Typography>
              <Spacer size="sm" />
              <CustomerCard customer={data.customer} />
              <Spacer size="sm" />
              <Button
                variant="text"
                size="small"
                sx={{ mr: '10px' }}
                onClick={() => setOpenCustomerSelectDialog(true)}
                disabled={shouldDisableEdit}
              >
                Change Customer
              </Button>
            </CardContent>
          </Card>
          <Spacer size="md" />
          <Card>
            <CardContent>
              <Typography variant="h5">Service</Typography>
              <Typography variant="caption">
                Optional. Select the service performed on the customer during
                this visit, leave blank if none was performed.
              </Typography>
              <Spacer size="sm" />
              {data.activity ? (
                <ActivityCard activity={data.activity} />
              ) : (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setOpenActivitySelectDialog(true)}
                  disabled={shouldDisableEdit}
                >
                  Add Activity
                </Button>
              )}
              {data.activity && (
                <>
                  <Spacer size="sm" />
                  <Box>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ mr: '10px' }}
                      disabled={shouldDisableEdit}
                      onClick={async () => {
                        if (
                          data.activity?.isArchived &&
                          !(await confirm({
                            title: `Change the activity?`,
                            message:
                              'This activity has a new version and the current version is no longer available to book, the update action is irreversible.',
                          }))
                        ) {
                          return;
                        }
                        setOpenActivitySelectDialog(true);
                      }}
                    >
                      Modify Activity
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      disabled={shouldDisableEdit}
                      onClick={async () => {
                        if (
                          data.activity?.isArchived &&
                          !(await confirm({
                            title: `Remove ${data.activity.name} from this entry?`,
                            message:
                              'This activity has a new version and the current version is no longer available to book, the removal action is irreversible.',
                          }))
                        ) {
                          return;
                        }
                        updateEntryAndMutate.mutate({
                          id,
                          activityEntry: {
                            ...baseUpdateBody,
                            activityId: null,
                          },
                        });
                      }}
                    >
                      Remove Activity
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
          <Spacer size="md" />
          <Card>
            <CardContent>
              <Typography variant="h5">Products</Typography>
              <Typography variant="caption">
                Optional. Select all products the customer purchased during this
                visit, leave blank if none were purchased.
              </Typography>
              <Spacer size="sm" />
              {data.products?.map((p) => (
                <>
                  <Card key={p.id} variant="outlined">
                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Box>
                          <Typography variant="h6">
                            {p.product.name}
                            {p.isArchived && (
                              <Tooltip
                                sx={{ ml: 1 }}
                                title="This product variant has a newer version, if you remove the product you will not be able to bring it back."
                                arrow
                              >
                                <Chip
                                  variant="outlined"
                                  color="warning"
                                  size="small"
                                  label="Legacy record"
                                  clickable
                                />
                              </Tooltip>
                            )}
                          </Typography>
                          <Typography>{penniesToPrice(p.price)}</Typography>
                          <Typography variant="caption">
                            Variant: {p.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="text"
                        size="small"
                        disabled={!!data.charge.length}
                        onClick={async () => {
                          if (
                            !p.isArchived &&
                            !(await confirm({
                              title: `Remove ${p.product.name} (${p.description}) from this entry?`,
                              message:
                                'This product variant has a new version and the current version is no longer available to book, the removal action is irreversible.',
                            }))
                          ) {
                            return;
                          }
                          updateEntryAndMutate.mutate({
                            id,
                            activityEntry: {
                              ...baseUpdateBody,
                              variantId: data.products
                                ?.filter((v) => v.id !== p.id)
                                .map((v) => v.id),
                            },
                          });
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </CardContent>
                  </Card>
                  <Spacer size="sm" />
                </>
              ))}
              <Button
                variant="text"
                size="small"
                sx={{ mr: '10px' }}
                disabled={!!data.charge.length}
                onClick={() => setOpenProductSelectDialog(true)}
              >
                Add Product
              </Button>
            </CardContent>
          </Card>
          <Spacer size="md" />
          <Card>
            <CardContent>
              <Typography variant="h5">Charge entry</Typography>
              <Typography variant="caption">
                Lock in the activity entry and charge the visit on the
                customer&apos;s balance. You will be able to add a tip and
                review the details before confirming the charge.
              </Typography>
              <Spacer size="sm" />
              {!hasChargableItems && (
                <Alert severity="info">
                  This entry cannot be charged because it is does not have a
                  service booked or products added.
                </Alert>
              )}
              {!!data.charge.length && (
                <Alert severity="info">
                  This entry has already been charged{' '}
                  {penniesToPrice(data.charge[0].amount)}. This includes a{' '}
                  {penniesToPrice(data.tipCharged)} tip.
                </Alert>
              )}
              {hasChargableItems && !data.charge.length && (
                <Button
                  color="primary"
                  size="small"
                  disabled={!hasChargableItems}
                  onClick={() => setOpenChargeDialog(true)}
                >
                  Charge customer
                </Button>
              )}
            </CardContent>
          </Card>
          <Spacer size="md" />
          <Card>
            <CardContent>
              <Typography variant="h5">Custom forms</Typography>
              <Spacer />
              <If
                condition={false}
                el={
                  <FormIntegration
                    responses={data?.responses ?? []}
                    purpose={FormPurpose.ACTIVITY_ENTRY}
                    onResponseSaved={(res) => {
                      updateEntryAndMutate.mutate({
                        id,
                        activityEntry: {
                          ...baseUpdateBody,
                          responseIds: [
                            ...(baseUpdateBody.responseIds ?? []),
                            res.id,
                          ],
                        },
                      });
                    }}
                  />
                }
              >
                <Alert severity="info">
                  Custom forms are available to this entry once you complete
                  their basic information and press save.
                </Alert>
              </If>
            </CardContent>
          </Card>
          <Spacer size="md" />
          <Typography variant="caption" color="GrayText">
            Last edited {format(parseJSON(data.updatedAt), 'PPPpp')}
          </Typography>
          <Spacer size="lg" />
        </>
      )}
    </Container>
  );
}
