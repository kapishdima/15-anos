import React from "react";

import { Button, UsersIcon } from "@components/index";
import { useTranslation } from "react-i18next";

export const GuestEmptyList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="guests-empty-list">
      <UsersIcon />
      <h2 className="guests-empty-list__title heading1">
        {t("Your guest list is empty. Add first guest to it")}
      </h2>
      <Button variant="success">Add guests</Button>
    </div>
  );
};
