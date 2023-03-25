import { getFunctions } from 'firebase/functions';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { CloutFunctionResponse } from './http';

export const useMutation = (key: string) => {
  const [exucute, isLoading, error] = useHttpsCallable<any, CloutFunctionResponse>(
    getFunctions(),
    'login',
  );

  const mutate = async (data: any) => {
    const response = await exucute(data);

    return response?.data.result;
  };

  return {
    mutate,
    isLoading,
    error,
  };
};
