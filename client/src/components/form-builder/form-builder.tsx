import React from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
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
        {fields.map((f, i) => (
          <>
            {i !== 0 && <Divider sx={{ my: 2 }} key={f.id} />}
            <FormSection
              key={f.id}
              index={i}
              onRemove={() => remove(i)}
              sectionCount={fields.length}
            />
          </>
        ))}
        <Box sx={{ mt: 2 }}>
          <Divider>
            <Button
              fullWidth
              onClick={() => append(DEFAULT_SECTION_VAL)}
              data-testid="btn-add-section"
            >
              Add new section
            </Button>
          </Divider>
        </Box>
        {/* <Button onClick={form.handleSubmit(onSubmit)}>Test</Button> */}
      </FormProvider>
    </Container>
  );
};
