import * as React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import {
  FormControl,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

const StyledInputLabel = styled(InputLabel)<InputLabelProps>(
  ({ theme: { palette } }) => ({
    '&.Mui-focused': {
      color: palette.grey[800],
    },
  }),
);

const StyledSelect = styled(Select)<SelectProps>(({ theme: { palette } }) => ({
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
}));

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(
  ({ theme: { palette } }) => ({
    '&.Mui-selected': {
      backgroundColor: palette.grey[200],
    },
    '&:hover': {
      backgroundColor: palette.grey[200],
    },
  }),
);

export interface IOption {
  label: string;
  value: string;
}

export interface ISelectProps {
  control: Control;
  name: string;
  label: string;
  required?: boolean;
  onChange?: (e: SelectChangeEvent<string>) => void;
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
    render={({
      field: { onChange: onControllerChange, value },
      fieldState: { invalid },
    }) => (
      <FormControl fullWidth>
        <StyledInputLabel id={name}>{label}</StyledInputLabel>
        <StyledSelect
          multiple={multiple}
          label={label}
          labelId={name}
          value={value}
          error={invalid}
          onChange={onControllerChange}
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
