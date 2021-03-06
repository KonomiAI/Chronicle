import { useFormContext } from 'react-hook-form';
import {
  FormFieldProps,
  FieldFactoryFunction,
  TextFieldFactory,
  LongTextFieldFactory,
  NumberFieldFactory,
  MultipleChoiceFactory,
  MultiSelectFactory,
} from './form-fields-factory';

const FieldRenderDirectory: Record<string, FieldFactoryFunction> = {
  text: TextFieldFactory,
  longText: LongTextFieldFactory,
  number: NumberFieldFactory,
  multipleChoice: MultipleChoiceFactory,
  multiSelect: MultiSelectFactory,
};

export const ViewFormField = (props: FormFieldProps) => {
  const { control, setValue } = useFormContext();
  return FieldRenderDirectory[props.type](props, control, setValue);
};
