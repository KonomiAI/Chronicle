import React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import { FormControl } from '@mui/material';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyledInputLabel, StyledSelect, StyledMenuItem } from './styled';

export interface FormSelectBaseProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  required?: boolean;
}

interface withOptions<T extends FieldValues> extends FormSelectBaseProps<T> {
  options: FormOptionValue[];
  children?: never;
}

interface withChildren<T extends FieldValues> extends FormSelectBaseProps<T> {
  options?: never;
  children: React.ReactNode;
}

export type FormSelectProps<T extends FieldValues> =
  | withOptions<T>
  | withChildren<T>;

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options = [],
  children,
}: FormSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={{ required }}
    render={({ field: { onChange, value }, fieldState: { invalid } }) => (
      <FormControl fullWidth>
        <StyledInputLabel id={name}>{label}</StyledInputLabel>
        <StyledSelect
          size="small"
          label={label}
          labelId={name}
          value={value ?? ''}
          error={invalid}
          onChange={onChange}
          defaultValue=""
        >
          {children ||
            options.map((o, i) => (
              <StyledMenuItem key={o.id} tabIndex={i} value={o.label}>
                {o.label}
              </StyledMenuItem>
            ))}
        </StyledSelect>
      </FormControl>
    )}
  />
);
