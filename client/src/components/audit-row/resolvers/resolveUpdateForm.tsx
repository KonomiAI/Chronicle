import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { IResolver } from '../type';

export const resolveUpdateForm: IResolver = (params, _query, payload) => (
  <>
    Updated the custom form called{' '}
    <Link to={`/forms/${params.id}`}>
      <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>
        {payload.title}
      </Box>
    </Link>
  </>
);
