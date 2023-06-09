import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  INVALID_LOGIN_ATTEMPT,
  SUCCESS_ACCOUNT_CREATION,
} from '../../../app/constants/local-storage-keys';
import { useState } from 'react';

export type ErrorTypes = 'wrong' | 'user' | 'eventTitle wrong' | 'eventTitle null' | 'reUser';

export const useError = () => {
  const { t } = useTranslation();
  const [canLogin, setCanLogin] = useState(true);

  const detectCanLogin = () => {
    const attempts = JSON.parse(window.localStorage.getItem(INVALID_LOGIN_ATTEMPT) || '0');
    const hasMaxAttempts = attempts >= 3;
    const waitTimeSeconds = 10;
    const waitTime = attempts * waitTimeSeconds;

    if (hasMaxAttempts) {
      setCanLogin(false);
      toast.error(t('cant_login', { attempts, time: waitTime }), { toastId: 'cant_login' });
      waitLogin(waitTime);
    }

    return hasMaxAttempts;
  };

  const detectCanCreateProfile = () => {
    const successAccountCreation = JSON.parse(
      window.localStorage.getItem(SUCCESS_ACCOUNT_CREATION) || '0',
    );

    return successAccountCreation < 3;
  };

  const waitLogin = (time: number) => {
    setTimeout(() => {
      setCanLogin(true);
    }, time * 1000);
  };

  const onInvalidPassword = () => {
    const attempts = JSON.parse(window.localStorage.getItem(INVALID_LOGIN_ATTEMPT) || '0');
    window.localStorage.setItem(INVALID_LOGIN_ATTEMPT, JSON.stringify(attempts + 1));
    detectCanLogin();
  };

  const handleError = (error: ErrorTypes) => {
    switch (error) {
      case 'wrong': {
        onInvalidPassword();
        return toast.error(t('Incorrect password'));
      }
      case 'user':
        return toast.error(t('Authentication error. Try again'));
      case 'eventTitle wrong':
        return toast.error(t('Incorrect event name'));
      case 'eventTitle null':
        return toast.error(t('The event name has not been set yet. Сontact the event organizer'));
      case 'reUser':
        return toast.error(t('Authentication error. Try again'));
    }
  };

  return {
    handleError,
    canLogin,
    detectCanLogin,
    detectCanCreateProfile,
  };
};
