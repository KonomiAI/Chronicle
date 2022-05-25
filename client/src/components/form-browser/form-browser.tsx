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
import { useGetForms } from '../../data';
import { FormPurpose } from '../../types';

export interface FormBrowserProps {
  prompt?: string;
  purpose?: FormPurpose;
}

export function FormBrowser({ prompt, purpose }: FormBrowserProps) {
  const { data } = useGetForms({ purpose });
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
        {data?.map((form) => (
          <Grid key={form.id} item xs={12} md={6} lg={4}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5">{form.title}</Typography>

                  <If
                    condition={form.description}
                    el={
                      <Typography variant="body2">
                        No description available.
                      </Typography>
                    }
                  >
                    <Typography variant="body2">{form.description}</Typography>
                  </If>
                  <Spacer size="md" />
                  <Box>
                    <If condition={purpose && form.purpose === purpose}>
                      <Chip
                        label="Recommended"
                        size="small"
                        variant="outlined"
                      />
                    </If>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
