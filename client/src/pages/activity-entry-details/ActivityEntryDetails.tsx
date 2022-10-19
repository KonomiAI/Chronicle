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
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { ActivityCard, CustomerCard, If } from '../../components';
import { FormIntegration } from '../../components/form-integration/form-integration';
import { FormPurpose } from '../../types';
import { CustomerSelectDialog } from '../../components/customer-select-dialog/CustomerSelectDialog';
import { ActivityEntryDto } from '../../types/activity-entry';
import { ActivitySelectDialog } from '../../components/activity-select-dialog/ActivitySelectDialog';
import { updateActivityEntry, useGetActivityEntry } from '../../data';
import { ProductPickerDialog } from '../../components/procuct-picker-dialog/ProductPickerDialog';
import { penniesToPrice } from '../../utils';
import { useAlertDialog } from '../../components/use-alert';

export function ActivityEntryDetails() {
  // get id from route params
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { confirm, alert } = useAlertDialog();
  const [openCustomerSelectDialog, setOpenCustomerSelectDialog] =
    useState(false);
  const [openActivitySelectDialog, setOpenActivitySelectDialog] =
    useState(false);
  const [openProductSelectDialog, setOpenProductSelectDialog] = useState(false);
  if (!id) {
    return <div>TODO page failed to load</div>;
  }

  const updateEntryAndMutate = useMutation(updateActivityEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activity-entry', id]);
    },
    onError: () => {
      // TODO
    },
  });

  const { isLoading, data } = useGetActivityEntry(id);

  const baseUpdateBody: ActivityEntryDto = {
    customerId: data?.customer.id ?? '',
    activityId: data?.activity?.id,
    variantId: data?.products?.map((p) => p.id),
    responseIds: data?.responses?.map((r) => r.id),
  };
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
                      onClick={async () => {
                        if (data.activity?.isArchived) {
                          await alert({
                            title: `Change the activity?`,
                            message:
                              'This activity has a new version and the current version is no longer available to book, the update action is irreversible.',
                          });
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
                        onClick={async () => {
                          if (
                            p.isArchived &&
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
                onClick={() => setOpenProductSelectDialog(true)}
              >
                Add Product
              </Button>
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
