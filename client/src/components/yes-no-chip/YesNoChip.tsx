import { Chip } from '@mui/material';
import React from 'react';

interface YesNoChipProps {
  isYes: boolean;
}

const YesNoChip: React.FC<YesNoChipProps> = ({ isYes }) => {
  if (isYes) {
    return <Chip label="Yes" size="small" />;
  }

  return <Chip label="No" size="small" />;
};

export default YesNoChip;
