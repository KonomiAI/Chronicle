import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { DEFAULT_SECTION_VAL } from './const';
import { FormSection } from './form-section';
import { ßwillFixThisTypeLater } from '../../types';
import { usePermission } from '../use-permission/UsePermissionContext';

export interface FormBuilderProps {
  form: ßwillFixThisTypeLater;
  name: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ form, name }) => {
  const parsedName = name ? `${name}.` : name;

  const { canWrite } = usePermission();

  const {
    fields: sections,
    append,
    remove,
    move,
  } = useFieldArray({
    control: form.control,
    name: `${parsedName}sections`,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      {sections.map((f, i) => (
        <Box key={f.id}>
          {i !== 0 && <Divider sx={{ my: 2 }} />}
          <FormSection
            context={parsedName}
            index={i}
            onRemove={() => remove(i)}
            sectionCount={sections.length}
            onMoveDown={() => move(i, i + 1)}
            onMoveUp={() => move(i, i - 1)}
            disableMoveUp={i === 0}
            disableMoveDown={i === sections.length - 1}
          />
        </Box>
      ))}
      <Box sx={{ mt: 2 }}>
        <Divider>
          <Button
            fullWidth
            onClick={() => append(DEFAULT_SECTION_VAL())}
            data-testid="btn-add-section"
            disabled={!canWrite}
          >
            Add new section
          </Button>
        </Divider>
      </Box>
    </FormProvider>
  );
};
