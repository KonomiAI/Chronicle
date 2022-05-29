import React from 'react';
import {
  FormFieldSchema,
  FormOptionDataSource,
  FormOptionValue,
} from '@konomi.ai/c-form';
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form';
import Typography from '@mui/material/Typography';

import { FormInputField } from '../form-inputs/FormInputField';
import { FormSelect } from '../form-inputs/FormSelect';
import { MultiSelect } from '../form-inputs/MultiSelect';

export type FormFieldProps = FormFieldSchema;

export type FieldFactoryFunction = (
  props: FormFieldProps,
  control: Control,
  setValue: UseFormSetValue<FieldValues>,
) => JSX.Element;

export const TextFieldFactory: FieldFactoryFunction = (
  { name, optional, id }: FormFieldProps,
  control,
): JSX.Element => (
  <FormInputField
    name={id}
    control={control}
    rules={{ required: !optional }}
    label={name}
  />
);

export const LongTextFieldFactory: FieldFactoryFunction = (
  { name, optional, id }: FormFieldProps,
  control,
): JSX.Element => (
  <FormInputField
    name={id}
    control={control}
    rules={{ required: !optional }}
    multiline={5}
    label={name}
  />
);

export const NumberFieldFactory: FieldFactoryFunction = (
  { name, optional, id }: FormFieldProps,
  control,
): JSX.Element => (
  <FormInputField
    name={id}
    control={control}
    rules={{ required: !optional }}
    numberField
    label={name}
  />
);

// Needed to check for if options array is given or data source is given
function isOptionValue(
  object: FormOptionValue | FormOptionDataSource,
): object is FormOptionValue {
  return 'id' in object && 'label' in object;
}

const isOptionValueArray = (options: unknown): options is FormOptionValue[] =>
  Array.isArray(options) && options.every((option) => isOptionValue(option));

export const MultipleChoiceFactory: FieldFactoryFunction = (
  { name, optional, options, id }: FormFieldProps,
  control,
) =>
  isOptionValueArray(options) ? (
    <FormSelect
      name={id}
      control={control}
      required={!optional}
      label={name}
      options={options}
    />
  ) : (
    <Typography variant="subtitle1">
      Options from data source not supported currently
    </Typography>
  );

export const MultiSelectFactory: FieldFactoryFunction = (
  { name, optional, options, id }: FormFieldProps,
  control,
  setValue,
) =>
  isOptionValueArray(options) ? (
    <MultiSelect
      name={id}
      control={control}
      setValue={setValue}
      required={!optional}
      label={name}
      options={options}
    />
  ) : (
    <Typography variant="subtitle1">
      Options from data source not supported currently
    </Typography>
  );
