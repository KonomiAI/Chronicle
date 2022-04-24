import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  AlertTitle,
  Chip,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import VaraintCreateDialog from './VariantCreate';
import { PostProductBody, PostVariantBody, Product } from '../../types';
import { SaveBar } from '../../components';
import { createProduct, createVariant } from '../../data';
import { getFormErrorMessage, penniesToPrice } from '../../utils';

export default function InventoryCreatePage() {
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [variants, setVariants] = useState<PostVariantBody[]>([]);

  const { control, handleSubmit } = useForm<PostProductBody>({});

  const createProductAndMutate = useMutation(createProduct, {
    onSuccess: () => {
      navigate('/inventory');
    },
  });

  const navigate = useNavigate();

  const onSave = (body: PostProductBody) => {
    createProductAndMutate.mutate({
      ...body,
      variants,
    });
  };

  console.log(penniesToPrice(1234));

  const generateTableRows = () =>
    variants.map(({ description, price, barcode }) => (
      <TableRow key={barcode}>
        <TableCell>{description}</TableCell>
        <TableCell>{penniesToPrice(price)}</TableCell>
        <TableCell>
          <Chip label="Pending creation" size="small" />
        </TableCell>
        <TableCell>{barcode}</TableCell>
      </TableRow>
    ));

  return (
    <Container>
      <PageHeader pageTitle="Create a product" backURL="/inventory" />
      <Spacer size="lg" />
      {createProductAndMutate.isError && (
        <>
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while creating a product
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    label="Product name"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    required
                    error={invalid}
                    helperText={getFormErrorMessage(error?.type)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="brand"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    label="Brand name"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    required
                    error={invalid}
                    helperText={getFormErrorMessage(error?.type)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="lg" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '1em',
          gap: '5em',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Variants
        </Typography>
        <Box>
          <VaraintCreateDialog
            isOpen={isVariantDialogOpen}
            handleClose={() => setIsVariantDialogOpen(false)}
            handleCreate={(variant: PostVariantBody) => {
              const newVariants = [
                ...variants,
                {
                  ...variant,
                },
              ];
              setVariants(newVariants);
            }}
          />
          <Button
            variant="contained"
            onClick={() => setIsVariantDialogOpen(true)}
          >
            Add New Variant
          </Button>
        </Box>
      </Box>
      {variants.length === 0 ? (
        <>
          <Alert severity="warning">
            <AlertTitle>At least one variant must be created.</AlertTitle>
            Please use the &quot;add&quot; button to add a variant
          </Alert>
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Variant Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Barcode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{generateTableRows()}</TableBody>
          </Table>
        </TableContainer>
      )}
      <Spacer size="lg" />
      <SaveBar
        loading={createProductAndMutate.isLoading}
        disabled={variants.length === 0}
        open
        onSave={handleSubmit((data) => {
          onSave(data);
        })}
      />
    </Container>
  );
}
