import React, { useEffect, useState } from "react";
import { EventEmitter, Events } from "@/app/transport/event-bus";
import { Button } from "@/components";

import { useTranslation } from "react-i18next";

import { TogglePaymentStatus } from "./TogglePaymentStatus";

type CreatePaymentActionsProps = {
  modalId: string;
  isCompleted: boolean;
  updatePaymentStatus: () => void;
};

export const CreatePaymentActions: React.FC<CreatePaymentActionsProps> = ({
  modalId,
  isCompleted,
  updatePaymentStatus,
}) => {
  const { t } = useTranslation();
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    EventEmitter.subscribe(Events.FORM_MODIFY, ({ isDirty, id }) => {
      if (id === modalId) {
        setShowConfirmButton(isDirty);
      }
    });
  }, []);
  return (
    <>
      {!showConfirmButton ? (
        <TogglePaymentStatus
          onClick={updatePaymentStatus}
          isCompleted={Boolean(isCompleted)}
        />
      ) : null}
      {showConfirmButton ? (
        <Button
          aria-label="Close this dialog window"
          variant="success"
          type="submit"
        >
          {t("Confirm")}
        </Button>
      ) : null}
    </>
  );
};
