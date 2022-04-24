/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, RegisterOptions } from 'react-hook-form';
import { TextField } from '@mui/material';

import { ßwillFixThisTypeLater } from '../../types';
import { getFormErrorMessage } from '../../utils';

export interface DatePickerProps {
  control: ßwillFixThisTypeLater;
  name: string;
  label: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export function DateInput({ control, name, label, rules }: DatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error: controlError },
      }) => (
        <DatePicker
          label={label}
          inputFormat="YYYY-MM-DD"
          value={value}
          onChange={(e) => onChange(e.format('YYYY-MM-DD'))}
          mask="____-__-__"
          renderInput={(params) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { error, ...rest } = params;
            return (
              <TextField
                fullWidth
                size="small"
                error={invalid}
                {...rest}
                helperText={getFormErrorMessage(controlError?.message)}
              />
            );
          }}
        />
      )}
    />
  );
}
