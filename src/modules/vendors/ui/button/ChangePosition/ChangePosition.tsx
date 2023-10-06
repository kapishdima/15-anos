import React from "react";
import { Button } from "@/components";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";

export const ChangePosition: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(AppRoutes.SET_USER_LOCATION);
  };

  return (
    <>
      <div className="change-position-container">
        <Button variant="success" appearance="ghost" onClick={onClick}>
          {t("Change the city")}
        </Button>
      </div>
    </>
  );
};
