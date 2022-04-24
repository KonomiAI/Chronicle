import React from 'react';
import { FormOptionValue } from '@konomi.ai/c-form';
import {
  Box,
  Chip,
  FormControl,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';
import { isStringArray } from '../../helpers';
import { StyledInputLabel, StyledSelect, StyledMenuItem } from './styled';

interface MultiSelectBaseProps {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
  name: string;
  label: string;
  required?: boolean;
}

interface withOptions extends MultiSelectBaseProps {
  options: FormOptionValue[];
  children?: never;
}

interface withChildren extends MultiSelectBaseProps {
  options?: never;
  children: React.ReactNode;
}

export type MultiSelectProps = withOptions | withChildren;

export const MultiSelect: React.FC<MultiSelectProps> = ({
  control,
  setValue,
  name,
  label,
  required = false,
  options = [],
  children,
}) => {
  const handleDeleteOnChip = (
    e: React.MouseEvent,
    value: string,
    selected: string[],
  ) => {
    e.preventDefault();
    const filtered = selected.filter((s) => s !== value);
    setValue(name, filtered);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={[]}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => (
        <FormControl fullWidth>
          <StyledInputLabel id={name}>{label}</StyledInputLabel>
          <StyledSelect
            size="small"
            multiple
            label={label}
            labelId={name}
            value={value}
            error={invalid}
            onChange={onChange}
            renderValue={(selected) => {
              if (!isStringArray(selected)) return undefined;
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((option) => (
                    <Chip
                      size="small"
                      variant="outlined"
                      key={option}
                      label={option}
                      clickable
                      deleteIcon={
                        <CloseIcon onMouseDown={(e) => e.stopPropagation()} />
                      }
                      onDelete={(e) => handleDeleteOnChip(e, option, selected)}
                    />
                  ))}
                </Box>
              );
            }}
          >
            {children ||
              options.map((o, i) => (
                <StyledMenuItem key={o.id} tabIndex={i} value={o.label}>
                  <ListItemText primary={o.label} />
                  <ListItemIcon
                    sx={{
                      display: value.indexOf(o.label) > -1 ? 'block' : 'none',
                      height: '24px',
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
};
