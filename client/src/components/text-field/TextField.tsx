import React from 'react';
import { TextField } from '@mui/material';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';

export interface TextInputProps {
  name: string;
  control: Control;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label: string;
  testId?: string;
  variant?: 'filled' | 'standard' | 'outlined';
}

export const TextInput = ({
  control,
  name,
  rules,
  label,
  testId,
  variant = 'outlined',
}: TextInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({
      field: { onChange, value },
      fieldState: { invalid, error },
    }) => (
      <TextField
        size="small"
        fullWidth
        label={label}
        onChange={onChange}
        value={value}
        variant={variant}
        error={invalid}
        helperText={getFormErrorMessage(error?.type)}
        data-testid={testId}
      />
    )}
  />
);
