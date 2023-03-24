import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { MIN_PASSWORD } from '../../../app/validation-constants';

export const useEventTitleField = () => {
  const [shown, setShown] = useState(false);
  const { watch } = useFormContext();

  const getShownState = (password: string) => {
    const lastSymbol = password?.at(-1) || '';
    const hasMinPassword = password.length >= MIN_PASSWORD;

    setShown(Boolean(hasMinPassword && lastSymbol === lastSymbol.toUpperCase()));
  };

  useEffect(() => {
    const subscription = watch((fields) => getShownState(fields.password));

    return () => subscription.unsubscribe();
  }, [watch]);

  return shown;
};
