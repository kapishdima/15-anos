import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button, useModal } from "@/components";
import { getPosition } from "@/modules/map/api/map";
import { AppRoutes } from "@/app/router/routes";

import { LocationModal, LOCATION_MODAL_ID } from "../../modals/LocationModal";

export const SearchVendorIntoMap = () => {
  const { t } = useTranslation();
  const { open } = useModal();

  const position = getPosition();

  const onClick = () => {
    open(LOCATION_MODAL_ID);
  };

  if (position) {
    return (
      <div className="search-vendor-bar">
        <Link to={AppRoutes.SEARCH_VENDORS} className="without-decoration">
          <Button onClick={onClick}>{t("Search for local vendors")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="search-vendor-bar">
        <Button onClick={onClick}>{t("Search for local vendors")}</Button>
      </div>
      <LocationModal />
    </>
  );
};
