import { InputAdornment } from '@mui/material';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';
import { StyledTextField } from './styled';

export type SupportedAdornment = 'money' | string;

export interface FormInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  testId?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  type?: React.InputHTMLAttributes<unknown>['type'];
  multiline?: number;
  disabled?: boolean;
  hiddenLabel?: boolean;
  fieldStartAdornment?: SupportedAdornment;
  fieldEndAdornment?: SupportedAdornment;
  autoFocus?: boolean;
}

const getAdornment = (position: 'start' | 'end', option?: 'money' | string) => {
  if (option === 'money') {
    // when we support currencies we can change this dynamically
    return <InputAdornment position={position}>$</InputAdornment>;
  }
  if (typeof option === 'string') {
    return <InputAdornment position={position}>{option}</InputAdornment>;
  }
  return undefined;
};

export const FormInputField = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  testId,
  variant = 'outlined',
  multiline = 0,
  type = 'text',
  disabled,
  hiddenLabel,
  fieldStartAdornment,
  fieldEndAdornment,
  autoFocus,
}: FormInputProps<T>) => {
  const handleOnChange = (value: string) => {
    if (type === 'number') {
      return parseFloat(value);
    }
    return value;
  };

  const startAdornment = getAdornment('start', fieldStartAdornment);
  const endAdornment = getAdornment('end', fieldEndAdornment);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error },
      }) => (
        <StyledTextField
          autoFocus={autoFocus}
          required={!!rules?.required ?? false}
          inputRef={ref}
          size="small"
          fullWidth
          label={label}
          onChange={(e) => onChange(handleOnChange(e.target.value))}
          value={value}
          variant={variant}
          error={invalid}
          helperText={error?.message || getFormErrorMessage(error?.type)}
          data-testid={testId}
          multiline={!!multiline}
          minRows={multiline ?? 0}
          maxRows={10}
          type={type}
          disabled={disabled}
          hiddenLabel={hiddenLabel}
          InputProps={{
            startAdornment,
            endAdornment,
          }}
        />
      )}
    />
  );
};
