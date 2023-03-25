import { getFunctions } from 'firebase/functions';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { CloutFunctionResponse } from '../../../app/http/http';
import { useError } from './useError';
import { INVALID_LOGIN_ATTEMPT } from '../../../app/contants/local-storage-keys';

export const useLogin = () => {
  const [exucute, isLoading, error] = useHttpsCallable<any, CloutFunctionResponse>(
    getFunctions(),
    'login',
  );
  const { canLogin, detectCanLogin, handleError } = useError();

  const prepareValues = (values: any) => {
    const isOwner = /.*[A-Z]$/gm.test(values.password);
    const isAssistant = /.*[a-z]$/gm.test(values.password);

    return {
      role: isOwner ? 'owner' : isAssistant ? 'assistant' : 'viewer',
      password: values.password,
      eventTitle: values.eventTitle,
    };
  };

  const clearInvalidAttempts = () => {
    window.localStorage.removeItem(INVALID_LOGIN_ATTEMPT);
  };

  const mutate = async (values: any) => {
    const hasMaxAttempts = detectCanLogin();

    if (hasMaxAttempts) {
      return;
    }

    const response = await exucute(prepareValues(values));

    if (response?.data.error) {
      return handleError(response?.data.error);
    }

    clearInvalidAttempts();

    return response?.data;
  };

  return {
    mutate,
    isLoading,
    error,
    canLogin,
  };
};
