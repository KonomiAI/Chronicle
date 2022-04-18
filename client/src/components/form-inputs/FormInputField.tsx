import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';
import { StyledTextField } from './styled';

export interface FormInputProps {
  name: string;
  control: Control;
  rules?: Omit<RegisterOptions, 'valueAsDate' | 'setValueAs' | 'disabled'>;
  label: string;
  testId?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  numberField?: boolean;
  multiline?: number;
}

export const FormInputField = ({
  control,
  name,
  rules,
  label,
  testId,
  variant = 'outlined',
  multiline = 0,
  numberField = false,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({
      field: { onChange, value },
      fieldState: { invalid, error },
    }) => (
      <StyledTextField
        size="small"
        fullWidth
        label={label}
        onChange={onChange}
        value={value}
        variant={variant}
        error={invalid}
        helperText={getFormErrorMessage(error?.type)}
        data-testid={testId}
        multiline={!!multiline}
        minRows={multiline ?? 0}
        maxRows={10}
        type={numberField ? 'number' : undefined}
      />
    )}
  />
);
