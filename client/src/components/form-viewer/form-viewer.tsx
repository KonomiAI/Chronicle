import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { ArrowBack } from '@mui/icons-material';
import { useMutation } from 'react-query';
import { LoadingButton } from '@mui/lab';
import {
  FormResponse,
  FormVersionWithForm,
  ResponseBody,
  SimpleResponse,
} from '../../types';
import { ViewFormField } from './view-form-field';
import Spacer from '../spacer/Spacer';
import { createResponse, updateResponse } from '../../data/response';

interface FormViewerProps {
  form: FormVersionWithForm;
  onGoBack?: () => void;
  onResponseSaved: (body: SimpleResponse) => void;
  response?: FormResponse | null;
}

export const FormViewer = ({
  form,
  onGoBack,
  onResponseSaved,
  response,
}: FormViewerProps): JSX.Element => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const methods = useForm({
    defaultValues: response?.latestResponseVersion?.body ?? {},
  });
  const createResponseAndMutate = useMutation(createResponse, {
    onSuccess: (data) => onResponseSaved(data),
    onSettled: () => setIsFormLoading(false),
  });
  const updateResponseAndMutate = useMutation(updateResponse, {
    onSuccess: (data) => onResponseSaved(data),
    onSettled: () => setIsFormLoading(false),
  });

  const saveForm = (body: ResponseBody) => {
    setIsFormLoading(true);
    if (response) {
      updateResponseAndMutate.mutate({
        id: response.id,
        data: {
          formVersionId: form.id,
          body,
        },
      });
      return;
    }
    createResponseAndMutate.mutate({
      formVersionId: form.id,
      body,
    });
  };

  const { sections } = form.body;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {onGoBack && (
          <IconButton
            aria-label="go back to form browser"
            size="large"
            sx={{ mr: 1 }}
            color="inherit"
            onClick={() => onGoBack()}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Box>
          {form.form.description && (
            <Box>
              <Typography variant="caption">{form.form.description}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Spacer size="md" />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...methods}>
        {sections.map((section, i) => (
          <Box key={section.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Section #{i + 1} - {section.name}
                </Typography>

                {section.description ? (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {section.description}
                  </Typography>
                ) : null}

                {section.fields.map((field) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    <ViewFormField
                      id={field.id}
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
            <Spacer size="md" />
          </Box>
        ))}
      </FormProvider>
      <LoadingButton
        variant="contained"
        fullWidth
        onClick={methods.handleSubmit(saveForm)}
        loading={isFormLoading}
      >
        Save {form.form.title} changes
      </LoadingButton>
    </>
  );
};

FormViewer.defaultProps = {
  response: null,
};
