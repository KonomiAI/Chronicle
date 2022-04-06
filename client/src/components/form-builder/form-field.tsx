/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FormFieldSchema, FormTemplateSchema } from 'c-form';
import {
  Control,
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
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import {
  Clear,
  ContentCopy,
  Delete,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { secureRandomString } from '../../utils';
import Spacer from '../spacer/Spacer';
import { TextInput } from '../text-field/TextField';
import { FieldTypeSelect } from './FieldTypeSelect';

interface FormFieldProps {
  sectionIndex: number;
  index: number;
  onRemove: () => void;
}

export const FormField = ({
  index,
  sectionIndex,
  onRemove,
}: FormFieldProps) => {
  const n = (
    name: keyof FormFieldSchema,
  ): `sections.${number}.fields.${number}.${keyof FormFieldSchema}` =>
    `sections.${sectionIndex}.fields.${index}.${name}`;
  const { control, setValue, getValues } = useFormContext();
  const [shouldShowDescription, setShouldShowDescription] = useState(false);
  const type = useWatch({
    control,
    name: n('type'),
  });
  const options = useWatch({
    control,
    name: n('options'),
  });
  const isOptionQuestionType =
    type === 'multipleChoice' || type === 'multiSelect';
  const { append, remove, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.fields.${index}.options`,
  });
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextInput
              control={control}
              name={n('name')}
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
              name={n('type')}
              onChange={(e) => {
                if (
                  e.target.value !== 'multipleChoice' &&
                  e.target.value !== 'multiSelect'
                ) {
                  setValue(n('options'), []);
                } else if (Array.isArray(options) && !options?.length) {
                  setValue(n('options'), [
                    {
                      id: secureRandomString(12),
                      label: '',
                    } as any,
                  ]);
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {shouldShowDescription && (
              <TextInput
                name={n('description')}
                control={control}
                label="Description (optional)"
              />
            )}
          </Grid>
          {isOptionQuestionType &&
            Array.isArray(fields) &&
            fields.map((f: any, i) => (
              <Grid item xs={12} key={f.id}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <RadioButtonUnchecked
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                  <Controller
                    name={`sections.${sectionIndex}.fields.${index}.options.${i}.label`}
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
                  } as any)
                }
              >
                Add option
              </Button>
            </Grid>
          )}
        </Grid>
        <Spacer />
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Controller
            name={n('optional')}
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Switch
                    onChange={(_, checked) => onChange(!checked)}
                    value={!value}
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
              >
                Add description
              </Button>
            )}
            <IconButton aria-label="duplicate this question">
              <ContentCopy />
            </IconButton>
            <IconButton
              aria-label="delete this question"
              onClick={() => onRemove()}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
