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

export interface FieldTypeSelectProps {
  control: Control;
  name: string;
  onChange?: (e: SelectChangeEvent<string>) => void;
}

export const FieldTypeSelect = ({
  control,
  name,
  onChange,
}: FieldTypeSelectProps) => (
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
);
