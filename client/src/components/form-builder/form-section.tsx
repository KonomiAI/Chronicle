import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { DEFAULT_FIELD_VAL } from './const';
import { FormField } from './form-field';
import { getFormErrorMessage } from '../../utils';
import { TextInput } from '../text-field/TextField';

interface FormSectionProps {
  index: number;
  onRemove: () => void;
}

export const FormSection = ({ index, onRemove }: FormSectionProps) => {
  const { control } = useFormContext();
  const [shouldShowDescription, setShouldShowDescription] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${index}.fields`,
  });

  return (
    <Card sx={{ mb: 4 }} data-testid="form-section">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Controller
              name={`sections.${index}.name`}
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  fullWidth
                  label="Section Title"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
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
              />
            ) : (
              <Button
                color="inherit"
                size="small"
                onClick={() => setShouldShowDescription(true)}
              >
                Add description
              </Button>
            )}
          </Grid>
        </Grid>
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
            fullWidth
            onClick={() => append(DEFAULT_FIELD_VAL)}
            data-testid="btn-add-field"
          >
            Add question to section
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
