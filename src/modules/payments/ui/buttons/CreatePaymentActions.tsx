import React, { useEffect, useState } from "react";
import { EventEmitter, Events } from "@/app/transport/event-bus";
import { Button } from "@/components";

import { useTranslation } from "react-i18next";

import { TogglePaymentStatus } from "./TogglePaymentStatus";

type CreatePaymentActionsProps = {
  isCompleted: boolean;
  updatePaymentStatus: () => void;
  loading: boolean;
};

export const CreatePaymentActions: React.FC<CreatePaymentActionsProps> = ({
  isCompleted,
  updatePaymentStatus,
  loading,
}) => {
  const { t } = useTranslation();
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    EventEmitter.subscribe(Events.FORM_MODIFY, ({ isDirty, id }) => {
      setShowConfirmButton(isDirty);
    });
  }, []);
  return (
    <>
      {showConfirmButton ? (
        <Button
          aria-label="Close this dialog window"
          variant="success"
          type="submit"
          loading={loading}
        >
          {t("Confirm")}
        </Button>
      ) : (
        <TogglePaymentStatus
          loading={loading}
          onClick={updatePaymentStatus}
          isCompleted={Boolean(isCompleted)}
        />
      )}
    </>
  );
};
