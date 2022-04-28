import React from 'react';
import {
  FormFieldSchema,
  FormOptionDataSource,
  FormOptionValue,
} from '@konomi.ai/c-form';
import { useFormContext } from 'react-hook-form';
import { Typography } from '@mui/material';

import { FormInputField } from '../form-inputs/FormInputField';
import { FormSelect } from '../form-inputs/FormSelect';
import { MultiSelect } from '../form-inputs/MultiSelect';

type FormFieldProps = Omit<FormFieldSchema, 'id'>;

function isOptionValue(
  object: FormOptionValue | FormOptionDataSource,
): object is FormOptionValue {
  return 'id' in object && 'label' in object;
}

const isOptionValueArray = (options: unknown): options is FormOptionValue[] =>
  Array.isArray(options) && options.every((option) => isOptionValue(option));

export const ViewFormField = ({
  name,
  type,
  optional,
  options,
  description,
}: FormFieldProps) => {
  const { control, setValue } = useFormContext();

  switch (type) {
    case 'text':
      return (
        <FormInputField
          name={name}
          control={control}
          rules={{ required: !optional }}
          label={description || name}
        />
      );
    case 'longText':
      return (
        <FormInputField
          name={name}
          control={control}
          rules={{ required: !optional }}
          multiline={5}
          label={description || name}
        />
      );
    case 'number':
      return (
        <FormInputField
          name={name}
          control={control}
          rules={{ required: !optional }}
          numberField
          label={description || name}
        />
      );
    case 'multipleChoice':
      return isOptionValueArray(options) ? (
        <FormSelect
          name={name}
          control={control}
          required={!optional}
          label={description || name}
          options={options}
        />
      ) : (
        <Typography variant="subtitle1">
          Options from data source not supported currently
        </Typography>
      );
    case 'multiSelect':
      return isOptionValueArray(options) ? (
        <MultiSelect
          name={name}
          control={control}
          setValue={setValue}
          required={!optional}
          label={description || name}
          options={options}
        />
      ) : (
        <Typography variant="subtitle1">
          Options from data source not supported currently
        </Typography>
      );
    default:
      return <Typography variant="h6">Field Type Not Supported</Typography>;
  }
};
