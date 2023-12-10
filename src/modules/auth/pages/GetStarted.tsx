import React from "react";
import {
  AuthLayout,
  AuthLayoutSubtitle,
  AuthLayoutTitle,
  Box,
  Button,
  useMediaQuery,
} from "@/components";

import Logo from "@image/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";

export const GetStartedPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const boxMaxWidth = isMobile ? "90vw" : "380px";

  return (
    <AuthLayout hasBackButton={false}>
      <Box maxWidth={boxMaxWidth}>
        <div className="login-form__container">
          <img src={Logo} alt="Quincy" className="logo" />
          <AuthLayoutTitle classes="login-form__container-title">
            {t("Quincy")}
          </AuthLayoutTitle>
          <AuthLayoutSubtitle classes="login-form__container-subtitle">
            {t("The perfect planner for a perfect Quinceañera")}
          </AuthLayoutSubtitle>
          <div className="get-started__actions">
            <Link
              to={AppRoutes.CREATE_PROFILE}
              className="create-profile-button"
            >
              <Button>{t("Create profile")}</Button>
            </Link>

            <Link to={AppRoutes.LOGIN} className="login-button">
              <Button variant="text" style={{ color: "#ed819e" }}>
                {t("Log in")}
              </Button>
            </Link>
          </div>
        </div>
      </Box>
    </AuthLayout>
  );
};
