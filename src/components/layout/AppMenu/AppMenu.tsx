import React from "react";

import { Link } from "react-router-dom";
import { createMenu } from "@/app/router/menu";
import { useTranslation } from "react-i18next";
import { Protected } from "@/modules/roles";

export const AppMenu: React.FC = () => {
  const menu = createMenu();
  const { t } = useTranslation();

  return (
    <div className="app-menu">
      {menu.map(({ title, items, action }) => {
        return (
          <Protected action={action}>
            <div className="app-menu__group" key={title}>
              <h4 className="app-menu__title">{t(title)}</h4>
              <div className="app-menu__links">
                {items.map((item) => (
                  <Link
                    to={item.path}
                    className="app-menu__link"
                    key={item.path}
                  >
                    {item.icon}
                    {t(item.title)}
                  </Link>
                ))}
              </div>
            </div>
          </Protected>
        );
      })}
    </div>
  );
};
