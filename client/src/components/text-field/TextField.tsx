import React from 'react';
import { TextField } from '@mui/material';
import { Controller, RegisterOptions } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';
import { ßwillFixThisTypeLater } from '../../types';

export interface TextInputProps {
  name: string;
  control: ßwillFixThisTypeLater;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label: string;
  testId?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  disableAutoStar?: boolean;
}

export const TextInput = ({
  control,
  name,
  rules,
  label,
  testId,
  variant = 'outlined',
  disableAutoStar,
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
        label={`${label} ${rules?.required && !disableAutoStar ? '*' : ''}`}
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
