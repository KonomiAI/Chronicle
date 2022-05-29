import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { ArrowBack } from '@mui/icons-material';
import { useMutation } from 'react-query';
import {
  FormResponse,
  FormVersionWithForm,
  ResponseBody,
  SimpleResponse,
} from '../../types';
import { ViewFormField } from './view-form-field';
import Spacer from '../spacer/Spacer';
import { createResponse } from '../../data/response';

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
  const methods = useForm({
    defaultValues: response?.latestResponseVersion?.body ?? {},
  });
  const createResponseAndMutate = useMutation(createResponse, {
    onSuccess: (data) => onResponseSaved(data),
  });

  const saveForm = (body: ResponseBody) =>
    createResponseAndMutate.mutate({
      formVersionId: form.id,
      body,
    });
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
          <Typography variant="h4">{form.form.title}</Typography>
          {form.form.description && (
            <Box>
              <Typography variant="body2">{form.form.description}</Typography>
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
      <Button
        variant="contained"
        fullWidth
        onClick={methods.handleSubmit(saveForm)}
      >
        Save {form.form.title} changes
      </Button>
    </>
  );
};

FormViewer.defaultProps = {
  response: null,
};
