import React, { useState } from 'react';

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
  Dialog,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import VaraintCreateDialog from './VariantCreate';
import { PostVariantBody, Variant } from '../../types';

export default function InventoryCreatePage() {
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);

  const generateTableRows = () =>
    variants.map(({ description, price, createdAt, barcode }) => (
      <TableRow>
        <TableCell>{description}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell>{barcode}</TableCell>
      </TableRow>
    ));

  return (
    <Container>
      <PageHeader pageTitle="Create a product" backURL="/inventory" />
      <Spacer size="lg" />
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="productName"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="productBrand"
                variant="outlined"
                required
                fullWidth
                label="Brand Name"
                autoFocus
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
      <Spacer size="lg" />
    </Container>
  );
}
