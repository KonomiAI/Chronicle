/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useGetProducts } from '../../data';
import { Product, Variant } from '../../types';
import { penniesToPrice } from '../../utils';
import Spacer from '../spacer/Spacer';

export interface ProductPickerDialogProps {
  open: boolean;
  variantCount?: number;
  handleClose: (products: Variant[] | null) => void;
}

const renderVariantList = (variants: Variant[]) => {
  const variantCountMap: Record<string, number> = {};
  const uniqueVariants: Variant[] = [];
  variants.forEach((variant) => {
    if (variantCountMap[variant.id]) {
      variantCountMap[variant.id] += 1;
    } else {
      variantCountMap[variant.id] = 1;
      uniqueVariants.push(variant);
    }
  });
  return uniqueVariants.map((variant) => (
    <ListItem key={variant.id}>
      <ListItemText>
        {variant.description} ({variantCountMap[variant.id]})
      </ListItemText>
    </ListItem>
  ));
};

export function ProductPickerDialog({
  handleClose,
  open,
}: ProductPickerDialogProps) {
  const { data } = useGetProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const closeModal = (res: Variant[] | null) => {
    handleClose(res);
    setSelectedVariants([]);
    setSelectedProduct(null);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Select product variants</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select products by selecting a product and then picking a variant. You
          can select a variant multiple times.
        </DialogContentText>
        <Spacer />
        <Typography variant="h6">Product</Typography>
        <Spacer size="sm" />
        {data ? (
          <Autocomplete
            options={data}
            getOptionLabel={(option: Product) => option.name}
            onChange={(_, value) => setSelectedProduct(value)}
            renderInput={(params) => <TextField {...params} label="Product" />}
          />
        ) : (
          <LinearProgress />
        )}
        <Spacer />
        <Typography variant="h6">Variants</Typography>
        <Spacer size="sm" />
        {selectedProduct ? (
          <ButtonGroup
            variant="contained"
            aria-label="variants for selected product"
          >
            {selectedProduct.variants
              // Disabled because our database is not set up correctly
              // TODO FIX THIS
              // .filter((v) => v.isAvailable)
              .map((v) => (
                <Button
                  key={v.id}
                  style={{ display: 'block' }}
                  onClick={() => {
                    setSelectedVariants([...selectedVariants, v]);
                  }}
                >
                  <Box>{v.description}</Box>
                  <Box>
                    <Typography variant="caption">
                      {penniesToPrice(v.price)}
                    </Typography>
                  </Box>
                </Button>
              ))}
          </ButtonGroup>
        ) : (
          <Alert severity="info">
            Select a product to see available variants
          </Alert>
        )}
        <Spacer />
        <Typography variant="h6">Selected product variants</Typography>
        <Spacer size="sm" />
        {selectedVariants.length > 0 ? (
          <List dense>{renderVariantList(selectedVariants)}</List>
        ) : (
          <Alert severity="info">
            The product variants you select will go here
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal(null)}>Cancel</Button>
        <Button
          onClick={() => closeModal(selectedVariants)}
          disabled={!selectedVariants.length}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
