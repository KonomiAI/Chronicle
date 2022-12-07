import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { IResolver } from '../type';

export const resolveUpdateStaffDetails: IResolver = (
  params,
  _query,
  payload,
) => (
  <>
    Updated the staff{' '}
    <Link to={`/staff/${params.id}`}>
      <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>
        {payload.firstName} {payload.lastName} ({payload.email})
      </Box>
    </Link>
  </>
);
