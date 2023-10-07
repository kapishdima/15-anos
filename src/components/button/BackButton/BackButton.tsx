import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EventEmitter, Events } from "@/app/transport/event-bus";
import { BackIcon, useModal } from "@components/index";
import {
  CloseConfirmationModal,
  CLOSE_CONFIRMATION_MODAL,
} from "@/components/modal/CloseConfirmationModal";

type BackButtonProps = {
  onBack?: () => void;
  backURL?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ onBack, backURL }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open, close } = useModal();

  const [shouldCloseConfirmation, setShouldConfirmation] = useState(false);

  const back = () => {
    if (onBack) {
      onBack();
    }

    if (backURL) {
      navigate(backURL);
    } else {
      navigate(-1);
    }
  };

  const handleClose = () => {
    if (shouldCloseConfirmation) {
      open(CLOSE_CONFIRMATION_MODAL);
    } else {
      back();
    }
  };

  const onConfirmedClose = () => {
    close(CLOSE_CONFIRMATION_MODAL);
    back();
  };

  const onCancelClose = () => {
    close(CLOSE_CONFIRMATION_MODAL);
  };

  useEffect(() => {
    EventEmitter.subscribe(Events.FORM_MODIFY, ({ isDirty }) => {
      setShouldConfirmation(isDirty);
    });
  }, []);

  useEffect(() => {
    EventEmitter.subscribe(Events.POSITION_MODIFY, ({ modified }) => {
      setShouldConfirmation(modified);
    });
  }, []);

  return (
    <>
      <div className="back-button" onClick={handleClose}>
        <BackIcon />
        <div className="back-button__title">{t("Back")}</div>
      </div>
      {ReactDOM.createPortal(
        <CloseConfirmationModal
          onConfirmedClose={onConfirmedClose}
          onCancelClose={onCancelClose}
        />,
        document.body
      )}
    </>
  );
};
