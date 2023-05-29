import React, { useState } from 'react';

import { Logout, EventCard, AppMenu } from '@components/index';

import Logo from '@image/logo.png';
import classNames from 'classnames';

export const AppNavbar: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const toggleSidebarOpened = () => {
    setOpened((_opened) => !_opened);
  };

  return (
    <div className={classNames('app-navbar', { opened })}>
      <div className="app-navbar__header">
        <div className="app-navbar__logo">
          <img src={Logo} alt="Quincy" />
          <div className="app-navbar__title">Quincy</div>
        </div>

        <div className={classNames('app-navbar__burger', { opened })} onClick={toggleSidebarOpened}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      <div className={classNames('app-navbar__content')}>
        <EventCard />
        <AppMenu />
        <Logout />
      </div>
    </div>
  );
};
