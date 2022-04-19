import { useEffect, useState } from 'react';
import { DeepPartial, UnpackNestedValue, UseFormReturn } from 'react-hook-form';

export interface UseSaveBarConfig {
  default?: boolean;
}

export function useSaveBar<T>(
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
    console.log('test');

    if (data) {
      form.reset(data);
    }
    const subscription = form.watch(() => setShouldShowSave(true));
    return () => subscription.unsubscribe();
  }, [data]);

  return [shouldShowSave, setData];
}
