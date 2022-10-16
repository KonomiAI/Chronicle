import React from 'react';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import { Control, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { Clear, RadioButtonUnchecked } from '@mui/icons-material';
import { ßwillFixThisTypeLater } from '../../../types';
import { secureRandomString } from '../../../utils';

export interface StaticBuilderProps {
  sectionIndex: number;
  index: number;
  context: string;
  control: Control;
}

export const StaticMultipleChoiceBuilder = ({
  context,
  sectionIndex,
  index,
  control,
}: StaticBuilderProps) => {
  const optionData = useWatch({
    control,
    name: `${context}sections.${sectionIndex}.fields.${index}.options`,
  });

  if (!Array.isArray(optionData)) {
    return <div>Changing field...</div>;
  }

  const { append, remove, fields } = useFieldArray({
    control,
    name: `${context}sections.${sectionIndex}.fields.${index}.options`,
  });
  return (
    <>
      {fields.map((f: ßwillFixThisTypeLater, i) => (
        <Grid item xs={12} key={f.id}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <RadioButtonUnchecked
              sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            />
            <Controller
              name={`${context}sections.${sectionIndex}.fields.${index}.options.${i}.label`}
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({
                field: { onChange, value, ref },
                fieldState: { invalid },
              }) => (
                <TextField
                  fullWidth
                  label="Option title"
                  variant="standard"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                  inputRef={ref}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      append(
                        {
                          id: secureRandomString(12),
                          label: '',
                        },
                        {
                          shouldFocus: true,
                        },
                      );
                    }
                  }}
                />
              )}
            />
            <IconButton
              aria-label="delete multiple select option"
              onClick={() => remove(i)}
              data-testid="btn-delete-option"
            >
              <Clear />
            </IconButton>
          </Box>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="text"
          color="inherit"
          onClick={() =>
            append({
              id: secureRandomString(12),
              label: '',
            })
          }
        >
          Add option
        </Button>
      </Grid>
    </>
  );
};
