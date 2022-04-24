import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Alert, AlertTitle, Container } from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import ProductBase from './ProductBase';
import { createVariant, updateProduct, useGetProduct } from '../../data';
import {
  PostProductBody,
  PostVariantBody,
  PutProductBody,
  Variant,
} from '../../types';
import LoadingCard from '../../components/loading-card';

const ProductEdit = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const navigate = useNavigate();
  const { productId } = useParams();

  const id = productId || '';

  const { data: product, isLoading, isError } = useGetProduct(id);

  useEffect(() => {
    setVariants(product?.variants || []);
  }, [variants]);

  const {
    isLoading: isUpdateProductLoading,
    isError: hasUpdateProductError,
    mutate: mutateUpdateProduct,
  } = useMutation(updateProduct, {
    onSuccess: () => {
      navigate('/inventory');
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
      {hasCreateVariantError && (
        <>
          <Alert severity="error">
            <AlertTitle>An unexpected error has occured</AlertTitle>
            Something went wrong while creating a variant
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      <ProductBase
        variants={variants}
        onSave={onSave}
        onAddVariant={handleAddVariant}
        product={product}
      />
      <Spacer size="lg" />
    </Container>
  );
};

export default ProductEdit;
