/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { FormFieldSchema } from '@konomi.ai/c-form';
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
} from '@mui/material';
import { Clear, Delete, RadioButtonUnchecked } from '@mui/icons-material';
import { secureRandomString } from '../../utils';
import { FieldTypeSelect } from './FieldTypeSelect';
import { FormInputField } from '../form-inputs/FormInputField';

interface FormFieldProps {
  sectionIndex: number;
  index: number;
  onRemove: () => void;
  context: string;
}

export const FormField = ({
  index,
  sectionIndex,
  onRemove,
  context,
}: FormFieldProps) => {
  const getFormName = (
    name: keyof FormFieldSchema,
  ): `${string}sections.${number}.fields.${number}.${keyof FormFieldSchema}` =>
    `${context}sections.${sectionIndex}.fields.${index}.${name}`;
  const { control, setValue } = useFormContext();
  const [shouldShowDescription, setShouldShowDescription] = useState(false);
  const type = useWatch({
    control,
    name: getFormName('type'),
  });
  const options = useWatch({
    control,
    name: getFormName('options'),
  });
  const isOptionQuestionType =
    type === 'multipleChoice' || type === 'multiSelect';
  const { append, remove, fields } = useFieldArray({
    control,
    name: `${context}sections.${sectionIndex}.fields.${index}.options`,
  });
  const isFieldOptionsAnArray = useMemo(() => Array.isArray(fields), [fields]);
  return (
    <Card sx={{ mb: 3 }} data-testid="form-field">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormInputField
              control={control}
              name={getFormName('name')}
              label="Question title"
              rules={{
                required: true,
                minLength: 1,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FieldTypeSelect
              control={control}
              name={getFormName('type')}
              onChange={(e) => {
                if (
                  e.target.value !== 'multipleChoice' &&
                  e.target.value !== 'multiSelect'
                ) {
                  setValue(getFormName('options'), []);
                } else if (Array.isArray(options) && !options?.length) {
                  setValue(getFormName('options'), [
                    {
                      id: secureRandomString(12),
                      label: '',
                    },
                  ]);
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {shouldShowDescription && (
              <FormInputField
                name={getFormName('description')}
                control={control}
                label="Description (optional)"
                multiline={2}
              />
            )}
          </Grid>
          {/* TODO integrate dynamic data selection availability */}
          {isOptionQuestionType &&
            isFieldOptionsAnArray &&
            fields.map((f: any, i) => (
              <Grid item xs={12} key={f.id}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <RadioButtonUnchecked
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                  <Controller
                    name={`${context}sections.${sectionIndex}.fields.${index}.options.${i}.label`}
                    control={control}
                    rules={{
                      required: true,
                      minLength: 1,
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <TextField
                        fullWidth
                        label="Option title"
                        variant="standard"
                        onChange={onChange}
                        value={value}
                        error={invalid}
                      />
                    )}
                  />
                  <IconButton
                    aria-label="delete multiple select option"
                    onClick={() => remove(i)}
                    data-testid="btn-delete-option"
                  >
                    <Clear />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          {isOptionQuestionType && (
            <Grid item xs={12}>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  append({
                    id: secureRandomString(12),
                    label: '',
                  })
                }
              >
                Add option
              </Button>
            </Grid>
          )}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Controller
            name={getFormName('optional')}
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Switch
                    onChange={(_, checked) => onChange(!checked)}
                    checked={!value}
                  />
                }
                label="Required"
              />
            )}
          />
          <Box>
            {!shouldShowDescription && (
              <Button
                color="inherit"
                size="small"
                onClick={() => setShouldShowDescription(true)}
                data-testid="btn-add-field-description"
              >
                Add description
              </Button>
            )}
            {/* TODO implement form field duplication feature. */}
            {/* <IconButton aria-label="duplicate this question">
              <ContentCopy />
            </IconButton> */}
            <IconButton
              aria-label="delete this question"
              onClick={() => onRemove()}
              data-testid="btn-delete-field"
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
