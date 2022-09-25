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
  createVariant,
  deleteProduct,
  deleteVariant,
  updateProduct,
  useGetProduct,
} from '../../data';
import { PostVariantBody, PutProductBody, Variant } from '../../types';
import LoadingCard from '../../components/loading-card';

const ProductEdit = () => {
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
    mutate: mutateCreateVariant,
  } = useMutation(createVariant, {
    onSuccess: (variant: Variant) => {
      const newVariants = [...variants, variant];
      setVariants(newVariants);
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

  const handleAddVariant = (variant: PostVariantBody) => {
    mutateCreateVariant({
      productId: id,
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
        onAddVariant={handleAddVariant}
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
              <Spacer size="lg" />
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
