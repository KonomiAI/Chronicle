import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { ArrowBack, Person } from '@mui/icons-material';
import { useMutation } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { FormSectionSchema } from '@konomi.ai/c-form';
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
  onResponseDelete?: (responseId: string) => void;
  response?: FormResponse | null;
}

interface FormInnerProps {
  sections: FormSectionSchema[];
  methods: UseFormReturn;
}

interface FormDialogProps extends FormInnerProps {
  open: boolean;
  onClose: () => void;
}

export const FormInner = ({ sections, methods }: FormInnerProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
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
);

export const FormDialog = ({
  methods,
  onClose,
  open,
  sections,
}: FormDialogProps) => (
  <Dialog open={open} onClose={onClose} fullScreen>
    <DialogContent>
      <FormInner methods={methods} sections={sections} />
    </DialogContent>
    <DialogActions>
      <IconButton onClick={onClose}>
        <ArrowBack />
      </IconButton>
    </DialogActions>
  </Dialog>
);

export const FormViewer = ({
  form,
  onGoBack,
  onResponseSaved,
  onResponseDelete,
  response,
}: FormViewerProps): JSX.Element => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box>
            {form.form.description && (
              <Typography variant="caption">{form.form.description}</Typography>
            )}
          </Box>
          <Box>
            <IconButton
              aria-label="go back to form browser"
              sx={{ mr: 1 }}
              size="small"
              color="inherit"
              onClick={() => setIsDialogOpen(true)}
            >
              <Person />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <FormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        methods={methods}
        sections={sections}
      />
      <Spacer size="md" />
      <FormInner sections={sections} methods={methods} />
      <LoadingButton
        variant="contained"
        fullWidth
        onClick={methods.handleSubmit(saveForm)}
        loading={isFormLoading}
      >
        Save {form.form.title} changes
      </LoadingButton>
      <Spacer size="sm" />
      {response && (
        <LoadingButton
          color="error"
          fullWidth
          onClick={() => onResponseDelete?.(response.id)}
          loading={isFormLoading}
        >
          Delete entry
        </LoadingButton>
      )}
    </>
  );
};

FormViewer.defaultProps = {
  response: null,
};
