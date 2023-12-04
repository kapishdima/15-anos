import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

import { RoleActions, Roles, permissions, roles } from "./roles";
import { EVENT_DETAILS } from "@app/constants/local-storage-keys";
import { useLocalStorage } from "usehooks-ts";
import { EventDetails } from "../auth/@types";

type RolesContextValues = {
  roles: typeof permissions;
  currentRole: string | null;
  hasPermission: (action: RoleActions) => boolean;
  hasPermissions: (action: RoleActions[]) => boolean;
};

export const RolesContext = createContext<RolesContextValues | null>(null);

export const RolesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [eventDetails] = useLocalStorage<EventDetails | null>(
    EVENT_DETAILS,
    null
  );

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

  const hasPermissions = (actions: RoleActions[]) => {
    if (!currentRole) {
      return false;
    }

    const permissionsForRole = permissions[currentRole];

    if (!permissionsForRole) {
      return false;
    }

    return actions.every((action) => permissionsForRole.includes(action));
  };

  useEffect(() => {
    const userId = eventDetails?.userId;
    if (!userId) {
      return;
    }
    setCurrentRole(roles[userId - 1]);
  }, [eventDetails]);

  return (
    <RolesContext.Provider
      value={{ roles: permissions, currentRole, hasPermission, hasPermissions }}
    >
      {children}
    </RolesContext.Provider>
  );
};
