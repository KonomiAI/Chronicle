import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Alert, AlertTitle, Container } from '@mui/material';
import { useSnackbar } from 'notistack';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ProductBase from './ProductBase';
import { createProduct } from '../../data';
import { PostProductBody, VariantBodyDto } from '../../types';

const ProductCreate = () => {
  const [variants, setVariants] = useState<VariantBodyDto[]>([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, isError, mutate } = useMutation(createProduct, {
    onSuccess: (created) => {
      navigate(`/inventory/products/${created.id}`);
      enqueueSnackbar('Product created successfully', { variant: 'success' });
    },
  });

  const onSave = (body: PostProductBody) => {
    mutate({
      ...body,
      variants,
    });
  };

  const handleAddVariant = (variant: VariantBodyDto) => {
    const newVariants = [...variants, variant];
    setVariants(newVariants);
  };

  const handleDeleteVariant = (barcode: string) => {
    const newVariants = variants.filter(
      (variant) => variant.barcode !== barcode,
    );
    setVariants(newVariants);
  };

  return (
    <Container>
      <PageHeader pageTitle="Create a product" backURL="/inventory" />
      <Spacer size="lg" />
      {isError && (
        <>
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while creating a product
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      <ProductBase
        variants={variants}
        onSave={onSave}
        onSaveVariant={handleAddVariant}
        onDeleteVariant={handleDeleteVariant}
        isLoading={isLoading}
      />
      <Spacer size="lg" />
    </Container>
  );
};

export default ProductCreate;
