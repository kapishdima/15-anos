import React, { useEffect, useState } from "react";
import { EventEmitter, Events } from "@/app/transport/event-bus";
import { Button } from "@/components";

import { useTranslation } from "react-i18next";

import { ToggleTaskStatus } from "../ToggleTaskStatus/ToggleTaskStatus";

type CreateTaskActionsProps = {
  isCompleted: boolean;
  loading: boolean;
  updateTaskStatus: () => void;
};

export const CreateTaskActions: React.FC<CreateTaskActionsProps> = ({
  isCompleted,
  loading,
  updateTaskStatus,
}) => {
  const { t } = useTranslation();
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    EventEmitter.subscribe(Events.FORM_MODIFY, ({ isDirty }) => {
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
        >
          {t("Save the task")}
        </Button>
      ) : (
        <ToggleTaskStatus
          loading={loading}
          onClick={updateTaskStatus}
          isCompleted={Boolean(isCompleted)}
        />
      )}
    </>
  );
};
