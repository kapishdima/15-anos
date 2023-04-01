import { useContext } from 'react';
import { UserLocationContext } from './UserLocationProvider';

export const useUserLocation = () => {
  return useContext(UserLocationContext);
};
