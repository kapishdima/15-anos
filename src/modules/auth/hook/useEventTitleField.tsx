import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { MIN_PASSWORD } from '../../../app/constants/validation-constants';

export const useEventTitleField = () => {
  const [shown, setShown] = useState(false);
  const { watch } = useFormContext();

  const getShownState = (password: string) => {
    const hasMinPassword = password.length >= MIN_PASSWORD;
    const hasLastUpperChar = /.*[A-Z]$/gm.test(password);

    setShown(Boolean(hasMinPassword && hasLastUpperChar));
  };

  useEffect(() => {
    const subscription = watch((fields) => getShownState(fields.password));

    return () => subscription.unsubscribe();
  }, [watch]);

  return shown;
};
