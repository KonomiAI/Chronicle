import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';

export interface UseSaveBarConfig {
  default?: boolean;
}

export function useSaveBar<T>(watch: UseFormWatch<T>) {
  const [shouldShowSave, setShouldShowSave] = useState(false);
  useEffect(() => {
    const subscription = watch(() => setShouldShowSave(true));
    return () => subscription.unsubscribe();
  }, []);

  return shouldShowSave;
}
