import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EventEmitter, Events } from "@/app/transport/event-bus";

import { Modal, useModal } from "@/components";
import { Map } from "@/modules/map";

import {
  CLOSE_CONFIRMATION_MODAL,
  CloseConfirmationModal,
} from "@/components/modal/CloseConfirmationModal";

export const LOCATION_MODAL_ID = "location_modal";
const closeConfirmationModalId = `${LOCATION_MODAL_ID}_${CLOSE_CONFIRMATION_MODAL}`;

export const LocationModal: React.FC = () => {
  const { t } = useTranslation();
  const { close, open } = useModal();

  const [shouldCloseConfirmation, setShouldConfirmation] = useState(false);

  const handleClose = () => {
    console.log(shouldCloseConfirmation);
    if (shouldCloseConfirmation) {
      open(closeConfirmationModalId);
    } else {
      close(LOCATION_MODAL_ID);
    }
  };

  const onConfirmedClose = () => {
    close(closeConfirmationModalId);
    close(LOCATION_MODAL_ID);
    EventEmitter.dispatch(Events.CLOSE_MODAL);
  };

  const onCancelClose = () => {
    close(closeConfirmationModalId);
  };

  useEffect(() => {
    EventEmitter.subscribe(Events.POSITION_MODIFY, ({ modified }) => {
      console.log(Events.POSITION_MODIFY, modified);
      setShouldConfirmation(modified);
    });
  }, []);
  return (
    <>
      <Modal
        id={LOCATION_MODAL_ID}
        title={t("Your location")}
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
        id={LOCATION_MODAL_ID}
        onCancelClose={onCancelClose}
        onConfirmedClose={onConfirmedClose}
      />
    </>
  );
};
