import React from 'react';
import { Box, Typography } from '@mui/material';

export interface TabPanelProps {
  children: any;
  index: number;
  value: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
