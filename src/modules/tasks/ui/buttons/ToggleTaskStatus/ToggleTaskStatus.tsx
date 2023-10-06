import { Button } from "@/components";
import React from "react";
import { useTranslation } from "react-i18next";

type ToggleTaskStatusProps = {
  onClick: () => void;
  loading: boolean;
  isCompleted: boolean;
};

export const ToggleTaskStatus: React.FC<ToggleTaskStatusProps> = ({
  onClick,
  loading,
  isCompleted,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      onClick={onClick}
      variant={isCompleted ? "error" : "success"}
      loading={loading}
    >
      {isCompleted ? t("Mark as not completed") : t("Mark as completed")}
    </Button>
  );
};
