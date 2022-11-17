/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FormFieldSchema, FormSupportedFieldTypes } from '@konomi.ai/c-form';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
} from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { secureRandomString } from '../../utils';
import { FieldTypeSelect } from './FieldTypeSelect';
import { FormInputField } from '../form-inputs/FormInputField';
import { SUPPORTED_OPTION_SOURCES } from './const';
import { StaticMultipleChoiceBuilder } from './components/StaticMultipleChoiceBuilder';
import { DynamicMultipleChoiceBuilder } from './components/DynamicMultipleChoiceBuilder';
import { FormFieldOptionsMenu } from './components/FormFieldOptionsMenu';
import { usePermission } from '../use-permission/UsePermissionContext';

interface FormFieldProps {
  sectionIndex: number;
  index: number;
  onRemove: () => void;
  context: string;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate?: () => void;
  disableMoveUp?: boolean;
  disableMoveDown?: boolean;
}

export const FormField = ({
  index,
  sectionIndex,
  onRemove,
  context,
  onMoveDown,
  onMoveUp,
  disableMoveUp,
  disableMoveDown,
  onDuplicate,
}: FormFieldProps) => {
  const getFormName = (
    name: keyof FormFieldSchema,
  ): `${string}sections.${number}.fields.${number}.${keyof FormFieldSchema}` =>
    `${context}sections.${sectionIndex}.fields.${index}.${name}`;
  const { control, setValue, unregister, register, getValues } =
    useFormContext();
  const description = getValues(getFormName('description'));
  const [shouldShowDescription, setShouldShowDescription] = useState(
    !!description,
  );
  const { canWrite } = usePermission();
  const type = useWatch({
    control,
    name: getFormName('type'),
  });

  const isStaticOptionQuestionType =
    type === FormSupportedFieldTypes.MULTIPLE_CHOICE ||
    type === FormSupportedFieldTypes.MULTI_SELECT;

  const isDynamicOptionQuestionType =
    type === FormSupportedFieldTypes.DATA_SOURCE_SELECT;

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
                  e.target.value === FormSupportedFieldTypes.DATA_SOURCE_SELECT
                ) {
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
              index={index}
              control={control}
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
                    disabled={!canWrite}
                    onChange={(_, checked) => onChange(!checked)}
                    checked={!value}
                  />
                }
                label="Required"
              />
            )}
          />
          <Box>
            {onMoveUp && (
              <IconButton
                onClick={onMoveUp}
                data-testid="move-up"
                disabled={disableMoveUp}
              >
                <ArrowUpward />
              </IconButton>
            )}
            {onMoveDown && (
              <IconButton
                onClick={onMoveDown}
                data-testid="move-down"
                disabled={disableMoveDown}
              >
                {/* Instead of importing another icon (more data to load), we just flip the same icon around lol
                    GH copilot is crazy.
                */}
                <ArrowUpward sx={{ transform: 'rotate(180deg)' }} />
              </IconButton>
            )}
            <FormFieldOptionsMenu
              onRemove={onRemove}
              onDuplicate={onDuplicate}
              onAddDescription={() => setShouldShowDescription(true)}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
