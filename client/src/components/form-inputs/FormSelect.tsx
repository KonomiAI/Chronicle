import React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import { FormControl } from '@mui/material';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyledInputLabel, StyledSelect, StyledMenuItem } from './styled';
import { usePermission } from '../use-permission/UsePermissionContext';

export interface FormSelectBaseProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  disabled?: boolean;
  disablePermissionCheck?: boolean;
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
  rules,
  options = [],
  children,
  disablePermissionCheck,
  disabled,
}: FormSelectProps<T>) => {
  const { canWrite } = usePermission();
  const shouldDisabled = disabled || (!disablePermissionCheck && !canWrite);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
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
            disabled={shouldDisabled}
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
};
