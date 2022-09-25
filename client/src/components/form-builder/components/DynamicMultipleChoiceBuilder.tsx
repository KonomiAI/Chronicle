/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Autocomplete, FormControl, Grid, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import {
  SUPPORTED_OPTION_SOURCES,
  SUPPORTED_OPTION_SOURCE_NAME_MAP,
} from '../const';

export interface DynamicBuilderProps {
  control: Control;
  name: string;
}

export const DynamicMultipleChoiceBuilder = ({
  control,
  name,
}: DynamicBuilderProps) => (
  <Grid item xs={12}>
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange: onControllerChange, value: controllerValue },
        fieldState: { invalid },
      }) => (
        <FormControl fullWidth>
          <Autocomplete
            disableClearable
            value={
              Array.isArray(controllerValue)
                ? controllerValue[0]
                : controllerValue
            }
            options={SUPPORTED_OPTION_SOURCES}
            getOptionLabel={(option) =>
              SUPPORTED_OPTION_SOURCE_NAME_MAP[option.url]
            }
            isOptionEqualToValue={(option, value) => option.url === value.url}
            onChange={(_, value) => onControllerChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={invalid}
                label="Data Sources"
                size="small"
              />
            )}
          />
        </FormControl>
      )}
    />
  </Grid>
);
