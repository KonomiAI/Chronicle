import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import { If } from '../../components';
import { FormIntegration } from '../../components/form-integration/form-integration';
import { FormPurpose } from '../../types';
import { CustomerSelectDialog } from '../../components/customer-select-dialog/CustomerSelectDialog';
import { ActivityEntryDto } from '../../types/activity-entry';
import { ActivitySelectDialog } from '../../components/activity-select-dialog/ActivitySelectDialog';
import { penniesToPrice } from '../../utils';
import { updateActivityEntry, useGetActivityEntry } from '../../data';
import { ProductPickerDialog } from '../../components/procuct-picker-dialog/ProductPickerDialog';

export function ActivityEntryDetails() {
  // get id from route params
  const { id } = useParams();
  const queryClient = useQueryClient();
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
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    {data.customer.firstName} {data.customer.lastName}
                  </Typography>
                  <Typography variant="caption">
                    {data.customer.email} {data.customer.phone}
                  </Typography>
                </CardContent>
              </Card>
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
                this visit.
              </Typography>
              <Spacer size="sm" />
              {data.activity ? (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{data.activity.name}</Typography>
                    <Typography>
                      {penniesToPrice(data.activity.price)}
                    </Typography>
                  </CardContent>
                </Card>
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
                      onClick={() => setOpenActivitySelectDialog(true)}
                    >
                      Modify Activity
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => {
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
                visit.
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
                          <Typography variant="h6">{p.product.name}</Typography>
                          <Typography>{penniesToPrice(p.price)}</Typography>
                          <Typography variant="caption">
                            Variant: {p.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
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
