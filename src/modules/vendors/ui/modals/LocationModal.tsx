import React from "react";
import { Modal } from "@/components";
import { useTranslation } from "react-i18next";

import { Map } from "@/modules/map";

export const LOCATION_MODAL_ID = "location_modal_id";

export const LocationModal: React.FC = () => {
  const { t } = useTranslation();
  return (
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
    >
      <Map />
    </Modal>
  );
};
