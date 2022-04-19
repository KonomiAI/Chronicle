import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

interface LoadingCardProps {
  title: string;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ title }) => (
  <Box display="flex" justifyContent="center" alignItems="center" p={2}>
    <Card>
      <LinearProgress />
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="h6">
              Give us a moment while we process the request.
            </Typography>
          </div>
          <div>
            <Typography>
              Stuck loading? Head back to the <Link to="/">home page</Link>.
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default LoadingCard;
