import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { FormSelect } from '../form-inputs/FormSelect';

export default function GenderSelect<T extends FieldValues>({
  control,
  name,
  rules,
  label,
}: UseControllerProps<T> & { label?: string }) {
  return (
    <FormSelect
      control={control}
      label={label ?? 'Gender'}
      name={name}
      rules={rules}
    >
      <MenuItem value="MALE">Male</MenuItem>
      <MenuItem value="FEMALE">Female</MenuItem>
      <MenuItem value="OTHER">Other</MenuItem>
      <MenuItem value="NOT_SPECIFIED">Prefer not to disclose</MenuItem>
    </FormSelect>
  );
}
