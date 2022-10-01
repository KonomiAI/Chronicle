import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '../../types';

export interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => (
  <Card variant="outlined">
    <CardContent>
      <Link to={`/customers/${customer.id}`}>
        <Typography variant="h6">
          {customer.firstName} {customer.lastName}
        </Typography>
      </Link>
      <Typography variant="caption">
        {customer.email} {customer.phone}
      </Typography>
    </CardContent>
  </Card>
);
