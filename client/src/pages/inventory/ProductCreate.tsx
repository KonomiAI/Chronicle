import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Alert, AlertTitle, Container } from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ProductBase from './ProductBase';
import { createProduct } from '../../data';
import { PostProductBody, PostVariantBody } from '../../types';

const ProductCreate = () => {
  const [variants, setVariants] = useState<PostVariantBody[]>([]);
  const navigate = useNavigate();

  const { isLoading, isError, mutate } = useMutation(createProduct, {
    onSuccess: () => {
      navigate('/inventory');
    },
  });

  const onSave = (body: PostProductBody) => {
    mutate({
      ...body,
      variants,
    });
  };

  const handleAddVariant = (variant: PostVariantBody) => {
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
        onAddVariant={handleAddVariant}
        onDeleteVariant={handleDeleteVariant}
        isLoading={isLoading}
      />
      <Spacer size="lg" />
    </Container>
  );
};

export default ProductCreate;
