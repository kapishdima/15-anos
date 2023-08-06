import React, { useEffect, useState } from "react";
import { EventEmitter, Events } from "@/app/transport/event-bus";
import { Button } from "@/components";

import { useTranslation } from "react-i18next";

import { ToggleTaskStatus } from "../ToggleTaskStatus/ToggleTaskStatus";

type CreateTaskActionsProps = {
  modalId: string;
  isCompleted: boolean;
  updateTaskStatus: () => void;
};

export const CreateTaskActions: React.FC<CreateTaskActionsProps> = ({
  modalId,
  isCompleted,
  updateTaskStatus,
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
        <ToggleTaskStatus
          onClick={updateTaskStatus}
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
