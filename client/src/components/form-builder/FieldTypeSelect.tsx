import React from 'react';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormSupportedFieldTypes } from '@konomi.ai/c-form';
import { usePermission } from '../use-permission/UsePermissionContext';

export interface FieldTypeSelectProps {
  control: Control;
  name: string;
  onChange?: (e: SelectChangeEvent<string>) => void;
}

export const FieldTypeSelect = ({
  control,
  name,
  onChange,
}: FieldTypeSelectProps) => {
  const { canWrite } = usePermission();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange: onControllerChange, value },
        fieldState: { invalid },
      }) => (
        <FormControl fullWidth>
          <InputLabel id="questionTypeLabel">Question type</InputLabel>
          <Select
            labelId="questionTypeLabel"
            value={value}
            size="small"
            disabled={!canWrite}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              }
              onControllerChange(e);
            }}
            label="Question type"
            error={invalid}
          >
            <Divider textAlign="left">Text</Divider>
            <MenuItem value={FormSupportedFieldTypes.TEXT}>Short text</MenuItem>
            <MenuItem value={FormSupportedFieldTypes.LONG_TEXT}>
              Paragraph
            </MenuItem>
            <Divider textAlign="left">Choice</Divider>
            <MenuItem value={FormSupportedFieldTypes.MULTIPLE_CHOICE}>
              Multiple choice
            </MenuItem>
            <MenuItem value={FormSupportedFieldTypes.MULTI_SELECT}>
              Multi-select
            </MenuItem>
            <MenuItem value={FormSupportedFieldTypes.DATA_SOURCE_SELECT}>
              Dynamic data select
            </MenuItem>
            <Divider textAlign="left">Other</Divider>
            <MenuItem value={FormSupportedFieldTypes.NUMBER}>Number</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
};
