import * as React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import {
  Box,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  ListItemText,
  ListItemIcon,
  Select,
  SelectProps,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
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
}

export const MultiSelect = ({
  control,
  name,
  label,
  onChange,
  required = false,
  options,
}: ISelectProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required }}
    defaultValue={[]}
    render={({
      field: { onChange: onControllerChange, value },
      fieldState: { invalid },
    }) => (
      <FormControl fullWidth>
        <StyledInputLabel id={name}>{label}</StyledInputLabel>
        <StyledSelect
          multiple
          label={label}
          labelId={name}
          value={value}
          error={invalid}
          onChange={onControllerChange}
          renderValue={(selected: any) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {options.map((o, i) => (
            <StyledMenuItem key={o.id} tabIndex={i} value={o.label}>
              <ListItemText primary={o.label} />
              <ListItemIcon
                sx={{
                  display: value.indexOf(o.label) > -1 ? 'block' : 'none',
                }}
              >
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    )}
  />
);
