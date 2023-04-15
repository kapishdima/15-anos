import React from 'react';

import { Link } from 'react-router-dom';
import { createMenu } from '@/app/router/menu';

export const AppMenu: React.FC = () => {
  const menu = createMenu();
  return (
    <div className="app-menu">
      {Object.entries(menu).map(([title, items]) => (
        <div className="app-menu__group">
          <h4 className="app-menu__title">{title}</h4>
          <div className="app-menu__links">
            {items.map((item) => (
              <Link to={item.path} className="app-menu__link">
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
