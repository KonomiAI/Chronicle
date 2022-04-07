import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FormTemplateSchema, validateWithLatest } from 'c-form';
import Spacer from '../spacer/Spacer';
import { DEFAULT_SCHEMA_VAL, DEFAULT_SECTION_VAL } from './const';
import { FormSection } from './form-section';

export const FormBuilder = () => {
  const form = useForm<FormTemplateSchema>({
    defaultValues: DEFAULT_SCHEMA_VAL,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sections',
  });
  const onSubmit = (data: FormTemplateSchema) => {
    const valid = validateWithLatest(data);
    if (!valid) {
      console.log(validateWithLatest.errors);
    }
  };

  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...form}>
        <Typography variant="h4">Sections</Typography>
        <Spacer size="md" />
        {fields.map((f, i) => (
          <FormSection key={f.id} index={i} onRemove={() => remove(i)} />
        ))}
        <Box sx={{ mt: 2 }}>
          <Button fullWidth onClick={() => append(DEFAULT_SECTION_VAL)}>
            Add section
          </Button>
        </Box>
        <Button onClick={form.handleSubmit(onSubmit)}>Test</Button>
      </FormProvider>
    </Container>
  );
};
