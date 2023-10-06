import { Button } from "@/components";
import React from "react";
import { useTranslation } from "react-i18next";

type TogglePaymentStatusProps = {
  onClick: () => void;
  isCompleted: boolean;
  loading: boolean;
};

export const TogglePaymentStatus: React.FC<TogglePaymentStatusProps> = ({
  onClick,
  isCompleted,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      onClick={onClick}
      variant={isCompleted ? "error" : "success"}
      loading={loading}
    >
      {isCompleted ? t("Mark as not paid") : t("Mark as paid")}
    </Button>
  );
};
