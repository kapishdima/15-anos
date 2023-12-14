import React, { PropsWithChildren, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { forceRefreshUser } from "../../modules/firebase/auth";
import { auth } from "../../modules/firebase";
import { User } from "firebase/auth";
import { AppRoutes } from "./routes";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const location = useLocation();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      await forceRefreshUser();
      setUser(user);
    });
  }, [location]);

  if (user === null) {
    return <Navigate replace to={AppRoutes.GET_STARTED} />;
  }

  return <>{children}</>;
};
