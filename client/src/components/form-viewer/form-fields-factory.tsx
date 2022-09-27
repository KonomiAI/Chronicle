import React, { useState } from 'react';
import {
  FormFieldSchema,
  FormOptionDataSource,
  FormOptionValue,
} from '@konomi.ai/c-form';
import {
  Control,
  FieldValues,
  useFormContext,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, Card, CardContent } from '@mui/material';

import { FormInputField } from '../form-inputs/FormInputField';
import { FormSelect } from '../form-inputs/FormSelect';
import { MultiSelect } from '../form-inputs/MultiSelect';
import { ProductPickerDialog } from '../procuct-picker-dialog/ProductPickerDialog';
import { Activity, Customer, Variant } from '../../types';
import { ActivitySelectDialog } from '../activity-select-dialog/ActivitySelectDialog';
import { CustomerSelectDialog } from '../customer-select-dialog/CustomerSelectDialog';
import { penniesToPrice } from '../../utils';
import Spacer from '../spacer/Spacer';

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

const buildDataSourceSelector = (
  id: string,
  options: FormOptionDataSource | FormOptionValue[],
) => {
  const { setValue, control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const result = useWatch({ name: id, control });
  const handleClose = (data: Customer | Variant[] | Activity | null) => {
    setIsOpen(false);
    if (!data) {
      return;
    }
    setValue(id, data);
  };

  if (Array.isArray(options)) {
    return (
      <Alert severity="error">
        There is an issue with this field. Please contact your administrator for
        help
      </Alert>
    );
  }
  if (options.url === '/products') {
    return (
      <>
        <Spacer size="sm" />
        {result &&
          Array.isArray(result) &&
          result.map((variant) => (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    {variant.product.brand} - {variant.product.name}
                  </Typography>
                  <Typography variant="caption">
                    {variant.description} {penniesToPrice(variant.price)}
                  </Typography>
                </CardContent>
              </Card>
              <Spacer size="sm" />
            </>
          ))}
        <ProductPickerDialog open={isOpen} handleClose={handleClose} />
        <Button onClick={() => setIsOpen(true)}>
          Open product select dialog
        </Button>
      </>
    );
  }
  if (options.url === '/activities') {
    return (
      <>
        <Spacer size="sm" />
        {result && (
          <>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{result.name}</Typography>
                <Typography variant="caption">
                  {penniesToPrice(result.price)}
                </Typography>
              </CardContent>
            </Card>
            <Spacer size="sm" />
          </>
        )}
        <ActivitySelectDialog open={isOpen} handleClose={handleClose} />
        <Button size="small" onClick={() => setIsOpen(true)}>
          Open activity select dialog
        </Button>
      </>
    );
  }
  if (options.url === '/customers') {
    return (
      <>
        <Spacer size="sm" />
        {result && (
          <>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {result.firstName} {result.lastName}
                </Typography>
                <Typography variant="caption">
                  {result.email} {result.phone}
                </Typography>
              </CardContent>
            </Card>
            <Spacer size="sm" />
          </>
        )}
        <CustomerSelectDialog open={isOpen} handleClose={handleClose} />
        <Button onClick={() => setIsOpen(true)}>
          Open customer select dialog
        </Button>
      </>
    );
  }
  return (
    <Alert severity="error">
      There is an issue with this field. Please contact your administrator for
      help
    </Alert>
  );
};
export const DatSourceSelectFactory: FieldFactoryFunction = ({
  name,
  optional,
  id,
  options,
  description,
}: FormFieldProps): JSX.Element => (
  <Box data-testid={`field-${id}`}>
    <Typography>
      {name} {optional ? '(Optional)' : ''}
    </Typography>
    <Typography variant="caption">{description}</Typography>
    {buildDataSourceSelector(id, options)}
  </Box>
);
