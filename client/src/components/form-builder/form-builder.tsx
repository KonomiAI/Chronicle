import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
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
  Typography,
} from '@mui/material';
import {
  Clear,
  ContentCopy,
  Delete,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { Control, Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormTemplateSchema } from 'c-form';
import Spacer from '../spacer/Spacer';
import {
  DEFAULT_FIELD_VAL,
  DEFAULT_SCHEMA_VAL,
  DEFAULT_SECTION_VAL,
} from './const';

const FormField = () => {
  const { control } = useForm({
    defaultValues: {
      name: '',
      description: '',
      type: 'text',
    },
  });
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Controller
              name="name"
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
              name="type"
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
              name="description"
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
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <RadioButtonUnchecked
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
              />
              <Controller
                name="name"
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
          <Grid item xs={12}>
            <Button variant="text" color="inherit">
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

interface FormSectionProps {
  control: Control<FormTemplateSchema, object>;
  index: number;
}

export const FormSection = ({ control, index }: FormSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: `sections.${index}.fields`,
  });
  return (
    <Card sx={{ mb: 4 }}>
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
            <IconButton aria-label="delete this section" sx={{ ml: 1 }}>
              <Delete />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={`sections.${index}.description`}
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
                  multiline
                  label="Description (optional)"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                />
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
          Questions
        </Typography>
        {fields.map((f) => (
          <FormField key={f.id} />
        ))}
        <Box sx={{ mt: 2 }}>
          <Button fullWidth onClick={() => append(DEFAULT_FIELD_VAL)}>
            Add question to section
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export const FormBuilder = () => {
  const { control, getValues } = useForm<FormTemplateSchema>({
    defaultValues: DEFAULT_SCHEMA_VAL,
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'sections',
  });

  return (
    <Container>
      <Typography variant="h4">Sections</Typography>
      <Spacer size="md" />
      {fields.map((f, i) => (
        <FormSection key={f.id} control={control} index={i} />
      ))}
      <Box sx={{ mt: 2 }}>
        <Button fullWidth onClick={() => append(DEFAULT_SECTION_VAL)}>
          Add section
        </Button>
      </Box>
    </Container>
  );
};
