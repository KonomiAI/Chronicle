import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import Spacer from '../spacer/Spacer';
import { If } from '../utils/util-components';

export interface FormBrowserProps {
  prompt?: string;
}

export function FormBrowser({ prompt }: FormBrowserProps) {
  return (
    <div>
      <If
        condition={prompt}
        el={
          <Typography variant="body2">
            The following forms can be added to this record.
          </Typography>
        }
      >
        <Typography variant="body2">{prompt}</Typography>
      </If>
      <Spacer size="md" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Card variant="outlined">
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">
                  Customer health information
                </Typography>

                <Typography variant="body2">
                  No description available.
                </Typography>
                <Spacer size="md" />
                <Box>
                  <Chip label="Recommended" size="small" variant="outlined" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
