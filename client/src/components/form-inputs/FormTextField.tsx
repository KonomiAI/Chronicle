import * as React from 'react';
import { styled, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';

const StyledTextField = styled(TextField)<TextFieldProps>(
  ({ theme: { palette } }) => ({
    '& .MuiInputLabel-root': {
      // Label
      '&.Mui-focused': {
        color: palette.grey[800],
      },
    },

    '& .MuiOutlinedInput-root': {
      // For outline border and input text
      '&.Mui-focused': {
        '.MuiOutlinedInput-notchedOutline': {
          // Outlined Border
          border: `1px solid ${palette.grey[800]}`,
        },
        '.MuiOutlinedInput-input': {
          // Input text
          color: palette.grey[800],
        },
      },
      '&:hover': {
        '.MuiOutlinedInput-notchedOutline': {
          // Outlined Border
          border: `1px solid ${palette.grey[800]}`,
        },
      },
    },
  }),
);

export interface ShortTextInputProps {
  name: string;
  control: Control;
  rules?: Omit<RegisterOptions, 'valueAsDate' | 'setValueAs' | 'disabled'>;
  label: string;
  testId?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  numberField?: boolean;
  multiline?: number;
}

export const FormTextField = ({
  control,
  name,
  rules,
  label,
  testId,
  variant = 'outlined',
  multiline = 0,
  numberField = false,
}: ShortTextInputProps) => (
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
