import React from 'react';

import { UsersIcon, SeetingPlanIcon, InviteIcon } from '../../icons';

export const AppMenu: React.FC = () => {
  return (
    <div className="app-menu">
      <div className="app-menu__group">
        <h4 className="app-menu__title">Guests</h4>
        <div className="app-menu__links">
          <a href="/" className="app-menu__link">
            <UsersIcon />
            Guests list
          </a>
          <a href="/" className="app-menu__link">
            <SeetingPlanIcon />
            Seating plan
          </a>
          <a href="/" className="app-menu__link">
            <InviteIcon />
            Invitation
          </a>
        </div>
      </div>
      <div className="app-menu__group">
        <h4 className="app-menu__title">Guides & Inspiration</h4>
        <div className="app-menu__links">
          <a href="/" className="app-menu__link">
            Inspiration & Mood Board
          </a>
        </div>
      </div>
      <div className="app-menu__group">
        <h4 className="app-menu__title">Administrative tools</h4>
        <div className="app-menu__links">
          <a href="/" className="app-menu__link">
            Weeding profile
          </a>
          <a href="/" className="app-menu__link">
            Preferense
          </a>
          <a href="/" className="app-menu__link">
            Design
          </a>
          <a href="/" className="app-menu__link">
            Invite
          </a>
          <a href="/" className="app-menu__link">
            Language and region
          </a>
          <a href="/" className="app-menu__link">
            Say thank you
          </a>
          <a href="/" className="app-menu__link">
            Turn off ads
          </a>
        </div>
      </div>
    </div>
  );
};
