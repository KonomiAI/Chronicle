/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FormFieldSchema } from '@konomi.ai/c-form';
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
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
import {
  SUPPORTED_OPTION_SOURCES,
  SUPPORTED_OPTION_SOURCE_NAME_MAP,
} from './const';

interface FormFieldProps {
  sectionIndex: number;
  index: number;
  onRemove: () => void;
  context: string;
}

interface StaticBuilderProps {
  sectionIndex: number;
  index: number;
  context: string;
  control: Control;
}

const StaticMultipleChoiceBuilder = ({
  context,
  sectionIndex,
  index,
  control,
}: StaticBuilderProps) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `${context}sections.${sectionIndex}.fields.${index}.options`,
  });
  return (
    <>
      {fields.map((f: any, i) => (
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
    </>
  );
};

interface DynamicBuilderProps {
  control: Control;
  name: string;
}

const DynamicMultipleChoiceBuilder = ({
  control,
  name,
}: DynamicBuilderProps) => (
  <Grid item xs={12}>
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange: onControllerChange, value: controllerValue },
        fieldState: { invalid },
      }) => (
        <FormControl fullWidth>
          <Autocomplete
            disableClearable
            value={
              Array.isArray(controllerValue)
                ? controllerValue[0]
                : controllerValue
            }
            options={SUPPORTED_OPTION_SOURCES}
            getOptionLabel={(option) =>
              SUPPORTED_OPTION_SOURCE_NAME_MAP[option.url]
            }
            onChange={(_, value) => onControllerChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={invalid}
                label="Data Sources"
                size="small"
              />
            )}
          />
        </FormControl>
      )}
    />
  </Grid>
);

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

  const isStaticOptionQuestionType =
    type === 'multipleChoice' || type === 'multiSelect';

  const isDynamicOptionQuestionType = type === 'dataSourceSelect';

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
                  e.target.value !== 'multiSelect' &&
                  e.target.value !== 'dataSourceSelect'
                ) {
                  setValue(getFormName('options'), []);
                } else if (e.target.value === 'dataSourceSelect') {
                  setValue(getFormName('options'), [
                    SUPPORTED_OPTION_SOURCES[0],
                  ]);
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
          {isStaticOptionQuestionType && (
            <StaticMultipleChoiceBuilder
              context={context}
              control={control}
              index={index}
              sectionIndex={sectionIndex}
            />
          )}
          {isDynamicOptionQuestionType && (
            <DynamicMultipleChoiceBuilder
              name={getFormName('options')}
              control={control}
            />
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
