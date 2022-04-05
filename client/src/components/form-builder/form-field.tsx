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
import { getFormErrorMessage, secureRandomString } from '../../utils';
import Spacer from '../spacer/Spacer';

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
  const { control, setValue } = useFormContext();
  const type = useWatch({
    control,
    name: n('type'),
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
            <Controller
              name={n('name')}
              control={control}
              rules={{
                required: true,
                minLength: 1,
                min: 1,
              }}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name={n('type')}
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <FormControl fullWidth>
                  <InputLabel id="questionTypeLabel">Question type</InputLabel>
                  <Select
                    labelId="questionTypeLabel"
                    value={value}
                    onChange={(e) => {
                      if (
                        e.target.value !== 'multipleChoice' &&
                        e.target.value !== 'multiSelect'
                      ) {
                        setValue(n('options'), []);
                      }
                      onChange(e);
                    }}
                    label="Question type"
                    error={invalid}
                  >
                    <Divider textAlign="left">Text</Divider>
                    <MenuItem value="text">Short text</MenuItem>
                    <MenuItem value="longText">Paragraph</MenuItem>
                    <Divider textAlign="left">Choice</Divider>
                    <MenuItem value="multipleChoice">Multiple choice</MenuItem>
                    <MenuItem value="multiSelect">Multi-select</MenuItem>
                    <Divider textAlign="left">Other</Divider>
                    <MenuItem value="number">Number</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={n('description')}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <TextField
                  multiline
                  fullWidth
                  label="Description (optional)"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                />
              )}
            />
          </Grid>
          {isOptionQuestionType &&
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
