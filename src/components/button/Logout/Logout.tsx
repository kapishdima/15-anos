import React from 'react';

import LogoutIcon from '../../../image/icons/sign-out.svg';

export const Logout: React.FC = () => {
  return (
    <div className="logout">
      Logout
      <img src={LogoutIcon} alt="Logout" />
    </div>
  );
};
