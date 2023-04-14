import React, { PropsWithChildren } from 'react';
import { usePermission } from './usePermission';
import { RoleActions } from './roles';

type ProtectedProps = PropsWithChildren & {
  action: RoleActions;
};

export const Protected: React.FC<ProtectedProps> = ({ action, children }) => {
  const permission = usePermission();

  if (!permission) {
    return null;
  }

  if (permission.hasPermission(action)) {
    return <>{children}</>;
  }

  return null;
};
