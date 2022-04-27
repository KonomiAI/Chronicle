import React from 'react';
import { Control, Controller, RegisterOptions, Path } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';
import { StyledTextField } from './styled';

export interface FormInputProps<T> {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<RegisterOptions, 'valueAsDate' | 'setValueAs' | 'disabled'>;
  label: string;
  testId?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  numberField?: boolean;
  multiline?: number;
  required?: boolean;
}

export const FormInputField = <T,>({
  control,
  name,
  rules,
  label,
  testId,
  variant = 'outlined',
  multiline = 0,
  numberField = false,
  required = false,
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({
      field: { onChange, value },
      fieldState: { invalid, error },
    }) => (
      <StyledTextField
        required={!!rules?.required ?? false}
        size="small"
        fullWidth
        label={label}
        onChange={onChange}
        required={required}
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
