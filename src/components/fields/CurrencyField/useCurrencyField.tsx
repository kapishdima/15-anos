import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const useCurrencyField = (onCurrencyChange: (value: string) => void) => {
  const { watch } = useFormContext();

  useEffect(() => {
    const subscription = watch((fields) => onCurrencyChange(fields.currency));

    return () => subscription.unsubscribe();
  }, [watch]);
};
