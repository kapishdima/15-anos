import React from "react";

import { useNavigate } from "react-router-dom";

import { logout } from "@/modules/firebase/auth";
import { AppRoutes } from "@app/router/routes";
import { LogoutIcon, Modal, useModal } from "@/components";
import { useTranslation } from "react-i18next";
import { getEventTitle } from "@/modules/event";

const LOGIN_CONFIRMATION_MODAL = "login_confirmation_modal";
const EVENT_TITLE_MODAL = "event_title_modal";

export const Logout: React.FC = () => {
  const { t } = useTranslation();
  const { open, close } = useModal();
  const navigate = useNavigate();

  const onClick = () => {
    const hasEventTitle = Boolean(getEventTitle());
    if (hasEventTitle) {
      open(LOGIN_CONFIRMATION_MODAL);
    } else {
      open(EVENT_TITLE_MODAL);
    }
  };

  const onCancelClose = () => {
    close(LOGIN_CONFIRMATION_MODAL);
  };

  const onConfirm = () => {
    logout();
    navigate(AppRoutes.LOGIN);
  };

  const onSpecityConfirm = () => {
    close(EVENT_TITLE_MODAL);
    navigate(AppRoutes.INVITE_SEETINGS);
  };

  return (
    <>
      <div className="logout" onClick={onClick}>
        <LogoutIcon />
        {t("Log out")}
      </div>
      <Modal
        id={LOGIN_CONFIRMATION_MODAL}
        title={t("Are you sure you want to log out?")}
        hasCloseIconButton={false}
        confirmButtonText={t("Yes")}
        cancelButtonText={t("No")}
        confirmButtonColor="error"
        cancelButtonColor="success"
        onCancel={onCancelClose}
        onConfirm={onConfirm}
      />
      <Modal
        maxWidth="45vw"
        id={EVENT_TITLE_MODAL}
        title={t(
          "You did not specify the event name. Without it, you can’t log in. Please specify it"
        )}
        confirmButtonText="Specify"
        onConfirm={onSpecityConfirm}
      ></Modal>
    </>
  );
};
