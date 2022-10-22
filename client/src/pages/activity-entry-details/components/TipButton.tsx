import { Button } from '@mui/material';
import React from 'react';

export interface TipButtonProps {
  onSelect: (amount: number) => void;
  subtotal: number;
  percentage: number;
}

export const TipButton: React.FC<TipButtonProps> = ({
  onSelect,
  subtotal,
  percentage,
}) => (
  <Button onClick={() => onSelect(Math.round(subtotal * percentage) / 100)}>
    {percentage * 100}%
  </Button>
);
