import React from 'react';

import { useNavigate } from 'react-router-dom';

import { logout } from '@modules/firebase/auth';
import { AppRoutes } from '@app/router/routes';
import { LogoutIcon } from '@/components';

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    logout();
    navigate(AppRoutes.LOGIN);
  };
  return (
    <div className="logout" onClick={onClick}>
      Logout
      <LogoutIcon />
    </div>
  );
};
