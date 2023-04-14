import React from 'react';

import { Logout, EventCard, AppMenu } from '@components/index';

import Logo from '@image/logo.png';

export const AppNavbar: React.FC = () => {
  return (
    <div className="app-navbar">
      <div className="app-navbar__logo">
        <img src={Logo} alt="Quincy" />
        <div className="app-navbar__title">Quincy</div>
      </div>
      <EventCard />
      <AppMenu />
      <Logout />
    </div>
  );
};
