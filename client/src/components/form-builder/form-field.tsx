/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FormFieldSchema } from '@konomi.ai/c-form';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
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
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { secureRandomString } from '../../utils';
import { FieldTypeSelect } from './FieldTypeSelect';
import { FormInputField } from '../form-inputs/FormInputField';
import { SUPPORTED_OPTION_SOURCES } from './const';
import { StaticMultipleChoiceBuilder } from './components/StaticMultipleChoiceBuilder';
import { DynamicMultipleChoiceBuilder } from './components/DynamicMultipleChoiceBuilder';

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
  const { control, setValue, unregister, register } = useFormContext();
  const [shouldShowDescription, setShouldShowDescription] = useState(false);
  const type = useWatch({
    control,
    name: getFormName('type'),
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
                if (e.target.value === 'dataSourceSelect') {
                  unregister(getFormName('options'));
                  setValue(getFormName('options'), SUPPORTED_OPTION_SOURCES[0]);
                  register(getFormName('options'));
                } else if (
                  e.target.value !== 'multipleChoice' &&
                  e.target.value !== 'multiSelect'
                ) {
                  // Change from multiple choice to a different type
                  setValue(getFormName('options'), []);
                } else {
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
