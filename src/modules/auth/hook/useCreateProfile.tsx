import { getFunctions } from 'firebase/functions';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { CloutFunctionResponse } from '../../../app/http/http';
import { useError } from './useError';
import { useUserLocation } from '../../../app/location/useUserLocation';
import { currensies } from '../../../app/data/currencies';
import format from 'date-fns/format';
import { getTimezoneOffset } from '../../../app/location/getTimezone';
import { SUCCESS_ACCOUNT_CREATION } from '../../../app/contants/local-storage-keys';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const useCreateProfile = () => {
  const [exucute, isLoading, error] = useHttpsCallable<any, CloutFunctionResponse>(
    getFunctions(),
    'createProfile',
  );
  const { t } = useTranslation();
  const { handleError, detectCanCreateProfile } = useError();
  const location = useUserLocation();

  const prepareValues = (values: any) => {
    const formatedData = format(new Date(values.date), 'yyyy-MM-dd-HH:mm');
    return {
      ...values,
      date: formatedData,
      timezone: getTimezoneOffset(location?.timezone || ''),
      market:
        currensies.find((currency) => currency.countryCode === location?.country)?.countryCode ||
        '',
    };
  };

  const saveSuccessAccountCreation = () => {
    const successAccountCreations = JSON.parse(
      window.localStorage.getItem(SUCCESS_ACCOUNT_CREATION) || '0',
    );
    window.localStorage.setItem(SUCCESS_ACCOUNT_CREATION, successAccountCreations + 1);
  };

  const mutate = async (values: any) => {
    if (!detectCanCreateProfile()) {
      return toast.error(
        t('You cannot create a new profile because you have already created 3 profiles'),
      );
    }

    const response = await exucute(prepareValues(values));
    if (response?.data.error) {
      return handleError(response?.data.error);
    }

    saveSuccessAccountCreation();

    return response?.data;
  };

  return {
    mutate,
    isLoading,
    error,
  };
};
