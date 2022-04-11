import React from 'react';
import { Box, Button, Container, Divider } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FormTemplateSchema, validateWithLatest } from '@konomi.ai/c-form';
import { DEFAULT_SCHEMA_VAL, DEFAULT_SECTION_VAL } from './const';
import { FormSection } from './form-section';

export const FormBuilder = () => {
  const form = useForm<FormTemplateSchema>({
    defaultValues: DEFAULT_SCHEMA_VAL,
  });
  const {
    fields: sections,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'sections',
  });
  const onSubmit = (data: FormTemplateSchema) => {
    // TODO implement integration with
    const valid = validateWithLatest(data);
    if (!valid) {
      console.error(validateWithLatest.errors);
    }
  };

  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...form}>
        {sections.map((f, i) => (
          <>
            {i !== 0 && <Divider sx={{ my: 2 }} key={f.id} />}
            <FormSection
              key={f.id}
              index={i}
              onRemove={() => remove(i)}
              sectionCount={sections.length}
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
      </FormProvider>
    </Container>
  );
};
