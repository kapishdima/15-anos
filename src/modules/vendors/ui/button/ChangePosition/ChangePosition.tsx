import { Button, useModal } from "@/components";
import React from "react";
import { useTranslation } from "react-i18next";

import { LOCATION_MODAL_ID, LocationModal } from "../../modals/LocationModal";
import { clearPosition } from "@/modules/map/api/map";

export const ChangePosition: React.FC = () => {
  const { t } = useTranslation();

  const { open } = useModal();

  const onClick = () => {
    clearPosition();
    open(LOCATION_MODAL_ID);
  };

  return (
    <>
      <div className="change-position-container">
        <Button variant="success" appearance="ghost" onClick={onClick}>
          {t("Change the city")}
        </Button>
      </div>
      <LocationModal />
    </>
  );
};
