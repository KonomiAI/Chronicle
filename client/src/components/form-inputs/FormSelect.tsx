import * as React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import { FormControl } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { StyledInputLabel, StyledSelect, StyledMenuItem } from './styled';

export interface ISelectProps {
  control: Control;
  name: string;
  label: string;
  required?: boolean;
  options: FormOptionValue[];
  multiple?: boolean;
}

export const FormSelect = ({
  control,
  name,
  label,
  required = false,
  options,
  multiple = false,
}: ISelectProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required }}
    render={({ field: { onChange, value }, fieldState: { invalid } }) => (
      <FormControl fullWidth>
        <StyledInputLabel id={name}>{label}</StyledInputLabel>
        <StyledSelect
          multiple={multiple}
          label={label}
          labelId={name}
          value={value}
          error={invalid}
          onChange={onChange}
        >
          {options.map((o, i) => (
            <StyledMenuItem key={o.id} tabIndex={i} value={o.id}>
              {o.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    )}
  />
);
