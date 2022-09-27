import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Variant } from '../../types';
import { penniesToPrice } from '../../utils';

export interface VariantCardProps {
  variant: Variant;
}

export const VariantCard: React.FC<VariantCardProps> = ({ variant }) => (
  <Card variant="outlined">
    <CardContent>
      <Link to={`/inventory/products/${variant.product.id}`}>
        <Typography variant="h6">
          {variant.product.brand} - {variant.product.name}
        </Typography>
      </Link>
      <Typography variant="caption">
        {variant.description} {penniesToPrice(variant.price)}
      </Typography>
    </CardContent>
  </Card>
);
