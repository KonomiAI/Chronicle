import React from 'react';
import { Box } from '@mui/material';
import { SPACER_OPTIONS } from '../../vars';

export interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'saveBar' | number;
}

export default function Spacer({ size = 'sm' }: SpacerProps) {
  let relativeSize = 1;
  if (typeof size === 'number') {
    relativeSize = size;
  } else {
    relativeSize = SPACER_OPTIONS[size] ?? 1;
  }
  return <Box sx={{ py: relativeSize }} />;
}
