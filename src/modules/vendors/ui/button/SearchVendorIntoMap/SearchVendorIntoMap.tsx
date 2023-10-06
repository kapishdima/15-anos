import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@/components";
import { getPosition } from "@/modules/map/api/map";
import { AppRoutes } from "@/app/router/routes";

export const SearchVendorIntoMap = () => {
  const { t } = useTranslation();

  const position = getPosition();

  return (
    <div className="search-vendor-bar">
      <Link
        to={position ? AppRoutes.SEARCH_VENDORS : AppRoutes.SET_USER_LOCATION}
        className="without-decoration"
      >
        <Button>{t("Search for local vendors")}</Button>
      </Link>
    </div>
  );
};
