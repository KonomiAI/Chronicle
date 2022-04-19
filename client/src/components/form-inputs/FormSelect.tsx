import React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import { FormControl } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { StyledInputLabel, StyledSelect, StyledMenuItem } from './styled';

export interface FormSelectBaseProps {
  control: Control;
  name: string;
  label: string;
  required?: boolean;
}

interface withOptions extends FormSelectBaseProps {
  options: FormOptionValue[];
  children?: never;
}

interface withChildren extends FormSelectBaseProps {
  options?: never;
  children: React.ReactNode;
}

export type FormSelectProps = withOptions | withChildren;

export const FormSelect: React.FC<FormSelectProps> = ({
  control,
  name,
  label,
  required = false,
  options = [],
  children,
}) => (
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
          value={value}
          error={invalid}
          onChange={onChange}
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
