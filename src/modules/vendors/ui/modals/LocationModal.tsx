import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EventEmitter, Events } from "@/app/transport/event-bus";

import { Modal, useModal } from "@/components";
import { Map } from "@/modules/map";

import {
  CLOSE_CONFIRMATION_MODAL,
  CloseConfirmationModal,
} from "@/components/modal/CloseConfirmationModal";

type LocationModalProps = {
  id: string;
};

export const LocationModal: React.FC<LocationModalProps> = ({ id }) => {
  const { t } = useTranslation();
  const { close, open } = useModal();
  const closeConfirmationModalId = `${id}_${CLOSE_CONFIRMATION_MODAL}`;

  const [shouldCloseConfirmation, setShouldConfirmation] = useState(false);

  const handleClose = () => {
    console.log(shouldCloseConfirmation);
    if (shouldCloseConfirmation) {
      open(closeConfirmationModalId);
    } else {
      close(id);
    }
  };

  const onConfirmedClose = () => {
    close(closeConfirmationModalId);
    close(id);
    EventEmitter.dispatch(Events.CLOSE_MODAL);
  };

  const onCancelClose = () => {
    close(closeConfirmationModalId);
  };

  useEffect(() => {
    EventEmitter.subscribe(Events.POSITION_MODIFY, ({ modified }) => {
      setShouldConfirmation(modified);
    });
  }, []);
  return (
    <>
      <Modal
        id={id}
        title={t("City")}
        description={
          t(
            "To find local vendors mark your city on the map or enter its name"
          ) || ""
        }
        minHeight="90vh"
        minWidth="50vw"
        hasFooter={false}
        onCancel={handleClose}
      >
        <Map />
      </Modal>
      <CloseConfirmationModal
        id={id}
        onCancelClose={onCancelClose}
        onConfirmedClose={onConfirmedClose}
      />
    </>
  );
};
