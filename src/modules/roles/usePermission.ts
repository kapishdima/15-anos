import { useContext } from 'react';
import { RolesContext } from './RolesProvider';

export const usePermission = () => {
  return useContext(RolesContext);
};
