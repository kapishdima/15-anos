import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { forceRefreshUser } from '../../modules/firebase/auth';
import { auth } from '../../modules/firebase';
import { User } from 'firebase/auth';
import { Loader } from '../../components/layout/Loader/Loader';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const [_, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(async (user) => {
      await forceRefreshUser();
      setUser(user);
      setLoading(false);
    });
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};
