import React from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { UsersIcon } from "@components/index";
import { AppRoutes } from "@/app/router/routes";
import { Protected, RoleActions } from "@/modules/roles";

export const GuestEmptyList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="guests-empty-list">
      <UsersIcon />
      <h2 className="guests-empty-list__title ">
        {t("Your guest list is empty. Add first guest to it")}
      </h2>
      <Protected action={RoleActions.CREATE_GUEST}>
        <Link to={AppRoutes.CREATE_GUEST} className="guests-empty-list__link">
          Add guests
        </Link>
      </Protected>
    </div>
  );
};
