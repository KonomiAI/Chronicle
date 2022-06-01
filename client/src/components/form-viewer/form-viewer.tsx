import React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '../../types';
import { ViewFormField } from './view-form-field';
import PageHeader from '../page-header/PageHeader';
import Spacer from '../spacer/Spacer';

interface FormViewerProps {
  form: Form;
  // TODO: response
}

export const FormViewer = ({ form }: FormViewerProps): JSX.Element => {
  const methods = useForm();
  const { sections } = form.latestFormVersion.body;

  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...methods}>
        <PageHeader pageTitle={form.title} backURL="/forms" />
        <Spacer size="lg" />
        {sections.map((section, i) => (
          <>
            <Card key={section.id}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Section #{i + 1} - {section.name}
                </Typography>

                {section.description ? (
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {section.description}
                  </Typography>
                ) : null}

                {section.fields.map((field) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    <ViewFormField
                      name={field.name}
                      type={field.type}
                      optional={field.optional}
                      options={field.options}
                      description={field.description}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
            <Spacer size="lg" />
          </>
        ))}
      </FormProvider>
    </Container>
  );
};
