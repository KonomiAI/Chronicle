import React from 'react';
import { Box } from '@mui/material';

import { IResolver } from '../type';

export const resolveCreateRole: IResolver = (_params, _query, payload) => (
  <>
    Created a role called{' '}
    <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>
      {payload.name}
    </Box>
  </>
);
