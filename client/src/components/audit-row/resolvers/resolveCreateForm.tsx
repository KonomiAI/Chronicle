import { Box } from '@mui/material';
import React from 'react';
import { IResolver } from '../type';

export const resolveCreateForm: IResolver = (_params, _query, payload) => (
  <>
    Created a new form called{' '}
    <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>
      {payload.title}
    </Box>
  </>
);
