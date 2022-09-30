import { FormSupportedFieldTypes } from '@konomi.ai/c-form';
import { useFormContext } from 'react-hook-form';
import {
  FormFieldProps,
  FieldFactoryFunction,
  TextFieldFactory,
  LongTextFieldFactory,
  NumberFieldFactory,
  MultipleChoiceFactory,
  MultiSelectFactory,
  DatSourceSelectFactory,
} from './form-fields-factory';

const FieldRenderDirectory: Record<string, FieldFactoryFunction> = {
  [FormSupportedFieldTypes.TEXT]: TextFieldFactory,
  [FormSupportedFieldTypes.LONG_TEXT]: LongTextFieldFactory,
  [FormSupportedFieldTypes.NUMBER]: NumberFieldFactory,
  [FormSupportedFieldTypes.MULTIPLE_CHOICE]: MultipleChoiceFactory,
  [FormSupportedFieldTypes.MULTI_SELECT]: MultiSelectFactory,
  [FormSupportedFieldTypes.DATA_SOURCE_SELECT]: DatSourceSelectFactory,
};

export const ViewFormField = (props: FormFieldProps) => {
  const { control, setValue } = useFormContext();
  return FieldRenderDirectory[props.type](props, control, setValue);
};
