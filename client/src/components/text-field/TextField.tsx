import React from 'react';
import { TextField } from '@mui/material';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { getFormErrorMessage } from '../../utils';

export interface TextInputProps {
  name: string;
  control: Control;
  rules: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const TextInput = ({ control, name }: TextInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: true,
      minLength: 1,
      min: 1,
    }}
    render={({
      field: { onChange, value },
      fieldState: { invalid, error },
    }) => (
      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        onChange={onChange}
        value={value}
        error={invalid}
        helperText={getFormErrorMessage(error?.type)}
      />
    )}
  />
);
