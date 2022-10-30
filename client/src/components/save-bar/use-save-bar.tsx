import { useEffect, useState } from 'react';
import {
  DeepPartial,
  FieldValues,
  UnpackNestedValue,
  UseFormReturn,
} from 'react-hook-form';
import { fastUnsafeObjectCompare } from '../../utils/compare-object';

export interface UseSaveBarConfig {
  default?: boolean;
}

export function useSaveBar<T extends FieldValues>(
  form: UseFormReturn<T>,
): [
  boolean,
  React.Dispatch<
    React.SetStateAction<
      UnpackNestedValue<DeepPartial<T>> | UnpackNestedValue<T> | undefined
    >
  >,
] {
  const [shouldShowSave, setShouldShowSave] = useState(false);
  const [data, setData] = useState<
    UnpackNestedValue<DeepPartial<T>> | UnpackNestedValue<T>
  >();
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
    const subscription = form.watch((res) => {
      setShouldShowSave(!fastUnsafeObjectCompare(data, res));
    });
    return () => subscription.unsubscribe();
  }, [data]);

  return [shouldShowSave, setData];
}
