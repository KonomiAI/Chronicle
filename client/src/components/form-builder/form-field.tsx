import React from 'react';
import { FormFieldSchema, FormTemplateSchema } from 'c-form';
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
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

interface FormFieldProps {
  sectionIndex: number;
  index: number;
}

export const FormField = ({ index, sectionIndex }: FormFieldProps) => {
  const n = (
    name: keyof FormFieldSchema,
  ): `sections.${number}.fields.${number}.${keyof FormFieldSchema}` =>
    `sections.${sectionIndex}.fields.${index}.${name}`;
  const { control } = useFormContext();
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
              }}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
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
                    onChange={onChange}
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
          {fields.map((f: any, i) => (
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
                <IconButton aria-label="delete multiple select option">
                  <Clear />
                </IconButton>
              </Box>
            </Grid>
          ))}
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
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Required"
          />
          <Box>
            <IconButton aria-label="duplicate this question">
              <ContentCopy />
            </IconButton>
            <IconButton aria-label="delete this question">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
