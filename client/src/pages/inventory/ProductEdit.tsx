import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ProductBase from './ProductBase';
import {
  deleteProduct,
  deleteVariant,
  updateProduct,
  updateVariant,
  useGetProduct,
} from '../../data';
import { VariantBodyDto, PutProductBody, Variant } from '../../types';
import LoadingCard from '../../components/loading-card';
import { usePermission } from '../../components/use-permission/UsePermissionContext';

const ProductEdit = () => {
  const { canWrite } = usePermission();
  const [variants, setVariants] = useState<Variant[]>([]);
  const navigate = useNavigate();
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const id = productId || '';

  const { data: product, isLoading, isError } = useGetProduct(id);

  const {
    isLoading: isDeleteProductLoading,
    isError: hasDeleteProductError,
    mutate: mutateDeleteProduct,
  } = useMutation(deleteProduct, {
    onSuccess: () => {
      navigate('/inventory');
    },
  });

  useEffect(() => {
    setVariants(product?.variants || []);
  }, [product]);

  const {
    isLoading: isUpdateProductLoading,
    isError: hasUpdateProductError,
    mutate: mutateUpdateProduct,
  } = useMutation(updateProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getProduct', productId]);
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
    },
  });

  const {
    isLoading: isCreateVariantLoading,
    isError: hasCreateVariantError,
    mutate: mutateUpdateVariant,
  } = useMutation(updateVariant, {
    onSuccess: async (v: Variant) => {
      await queryClient.invalidateQueries(['getProduct', productId]);
      enqueueSnackbar(`${v.description} updated successfully`, {
        variant: 'success',
      });
    },
  });

  const {
    isLoading: isDeleteVariantLoading,
    isError: hasDeleteVariantError,
    mutate: mutateDeleteVariant,
  } = useMutation(deleteVariant, {
    onSuccess: (deletedVariant: Variant) => {
      const newVariants = variants.filter(
        (variant) => variant.id !== deletedVariant.id,
      );
      setVariants(newVariants);
    },
  });

  const onSave = ({ name, brand }: PutProductBody) => {
    mutateUpdateProduct({
      productId: id,
      data: {
        name,
        brand,
      },
    });
  };

  const handleEditVariant = (variant: VariantBodyDto, variantId?: string) => {
    if (!variantId) {
      return;
    }
    mutateUpdateVariant({
      productId: id,
      variantId,
      data: variant,
    });
  };

  const handleDeleteVariant = (barcode: string) => {
    const variantToDelete = variants.find(
      (variant) => variant.barcode === barcode,
    );
    mutateDeleteVariant({
      productId: id,
      variantId: variantToDelete?.id || '',
    });
  };

  if (isLoading) {
    return <LoadingCard title="Fetching product..." />;
  }

  if (isError || !product) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>An unexpected error has occured</AlertTitle>
          Something went wrong while fetching a product
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader pageTitle={product.name} backURL="/inventory" />
      <Spacer size="lg" />
      {hasUpdateProductError && (
        <>
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while updating a product
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      <ProductBase
        isLoading={isUpdateProductLoading}
        variants={variants}
        onSave={onSave}
        onSaveVariant={(data, vid) => handleEditVariant(data, vid)}
        isCreateVariantLoading={isCreateVariantLoading}
        hasCreateVariantError={hasCreateVariantError}
        onDeleteVariant={handleDeleteVariant}
        isDeleteVariantLoading={isDeleteVariantLoading}
        hasDeleteVariantError={hasDeleteVariantError}
        product={product}
      />
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
            Danger Zone
          </Typography>
          {hasDeleteProductError && (
            <>
              <Alert severity="error">
                <AlertTitle>An unexpected error has occured</AlertTitle>
                Something went wrong while deleting a product
              </Alert>
              <Spacer size="md" />
            </>
          )}
          {product.productInUse && (
            <>
              <Alert severity="warning">
                <AlertTitle>Product is in use</AlertTitle>
                This product is currently in use in one or more activity entries
                and cannot be deleted.
              </Alert>
              <Spacer size="md" />
            </>
          )}
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h6">Delete this product</Typography>
              <Typography variant="body2">
                Deleting this product will subsequently also delete all related
                variants shown in the Variants section.
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingButton
                loading={isDeleteProductLoading}
                variant="text"
                color="error"
                onClick={() => {
                  mutateDeleteProduct(id);
                }}
                disabled={!canWrite || product.productInUse}
              >
                Delete
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="lg" />
    </Container>
  );
};

export default ProductEdit;
