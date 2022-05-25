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
import { Form, FormPurpose } from '../../types';

export interface FormBrowserProps {
  purpose?: FormPurpose;
  onFormOpen?: (form: Form) => void;
}

export function FormBrowser({ purpose, onFormOpen }: FormBrowserProps) {
  const { data } = useGetForms({ purpose });
  return (
    <div>
      <Grid container spacing={2}>
        {data?.map((form) => (
          <Grid key={form.id} item xs={12} md={6} lg={4}>
            <Card
              variant="outlined"
              onClick={() => onFormOpen && onFormOpen(form)}
            >
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
