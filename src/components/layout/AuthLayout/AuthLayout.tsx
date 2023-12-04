import React, { PropsWithChildren } from "react";

import { useTranslation } from "react-i18next";

import AngleLeft from "@image/icons/angle-left.svg";
import { useNavigate } from "react-router-dom";
import { useAnalytics } from "@/app/analytics";

type AuthLayoutProps = {
  hasBackButton?: boolean;
};

export const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
  children,
  hasBackButton = true,
}) => {
  useAnalytics();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="auth-layout">
      <div className="auth-layout__header">
        {hasBackButton && (
          <div className="back-button" onClick={() => navigate(-1)}>
            <img src={AngleLeft} alt="" />
            {t("Back")}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
