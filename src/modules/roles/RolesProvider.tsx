import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { RoleActions, Roles, permissions, roles } from './roles';
import { EVENT_DETAILS } from '@app/constants/local-storage-keys';

type RolesContextValues = {
  roles: typeof permissions;
  currentRole: string | null;
  hasPermission: (action: RoleActions) => boolean;
};

export const RolesContext = createContext<RolesContextValues | null>(null);

export const RolesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Roles | null>(null);

  const hasPermission = (action: RoleActions) => {
    if (!currentRole) {
      return false;
    }

    const permissionsForRole = permissions[currentRole];

    if (!permissionsForRole) {
      return false;
    }

    return permissionsForRole.includes(action);
  };

  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem(EVENT_DETAILS) || '{}').userId;
    setCurrentRole(roles[userId - 1]);
  }, []);

  return (
    <RolesContext.Provider value={{ roles: permissions, currentRole, hasPermission }}>
      {children}
    </RolesContext.Provider>
  );
};
