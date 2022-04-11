import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DEFAULT_FIELD_VAL } from './const';
import { FormField } from './form-field';
import { TextInput } from '../text-field/TextField';
import Spacer from '../spacer/Spacer';

interface FormSectionProps {
  index: number;
  sectionCount: number;
  onRemove: () => void;
}

export const FormSection = ({
  index,
  onRemove,
  sectionCount,
}: FormSectionProps) => {
  const { control } = useFormContext();
  const [shouldShowDescription, setShouldShowDescription] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${index}.fields`,
  });

  return (
    <>
      <Spacer size="md" />
      <Box
        sx={{
          bgcolor: '#FF6961',
          p: 1,
          display: 'inline-block',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          color: 'white',
          fontWeight: 600,
          fontSize: 12,
        }}
      >
        Section {index + 1} of {sectionCount}
      </Box>
      <Card sx={{ mb: 4 }} data-testid="form-section">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <TextInput
                name={`sections.${index}.name`}
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Section Title"
              />
              <IconButton
                aria-label="delete this section"
                sx={{ ml: 1 }}
                onClick={() => onRemove()}
                data-testid="btn-delete-section"
              >
                <Delete />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {shouldShowDescription ? (
                <TextInput
                  control={control}
                  name={`sections.${index}.description`}
                  label="Section description (optional)"
                  testId="input-section-description"
                />
              ) : (
                <Button
                  color="inherit"
                  size="small"
                  data-testid="btn-add-section-description"
                  onClick={() => setShouldShowDescription(true)}
                >
                  Add description
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Questions
      </Typography>
      {fields.map((f, i) => (
        <FormField
          key={f.id}
          index={i}
          sectionIndex={index}
          onRemove={() => remove(i)}
        />
      ))}
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => append(DEFAULT_FIELD_VAL)}
          data-testid="btn-add-field"
        >
          Add question to section
        </Button>
      </Box>
    </>
  );
};
