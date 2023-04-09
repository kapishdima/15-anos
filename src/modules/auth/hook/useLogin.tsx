import { getFunctions } from 'firebase/functions';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { useNavigate } from 'react-router-dom';

import { CloutFunctionResponse } from '../../../app/http/http';
import { useError } from './useError';
import { EVENT_DETAILS, INVALID_LOGIN_ATTEMPT } from '../../../app/constants/local-storage-keys';
import { EventDetails } from '../@types';
import { AppRoutes } from '../../../app/router/routes';
import { forceRefreshUser } from '../../firebase/auth';

export const useLogin = () => {
  const [exucute, isLoading, error] = useHttpsCallable<any, CloutFunctionResponse>(
    getFunctions(),
    'login',
  );
  const { canLogin, detectCanLogin, handleError } = useError();
  const navigate = useNavigate();

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
    onSuccessLogin(response?.data);

    return response?.data;
  };

  const onSuccessLogin = async (eventDetails: EventDetails) => {
    window.localStorage.setItem(EVENT_DETAILS, JSON.stringify(eventDetails));
    const refreshed = await forceRefreshUser();

    if (refreshed) {
      navigate(AppRoutes.ROOT);
    }
  };

  return {
    mutate,
    isLoading,
    error,
    canLogin,
  };
};
