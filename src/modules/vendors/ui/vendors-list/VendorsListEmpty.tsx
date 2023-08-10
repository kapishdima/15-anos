import { Button, VendorsIcon } from "@/components";
import React from "react";
import { useTranslation } from "react-i18next";

export const VendorsListEmpty: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="vendors-list-empty">
      <VendorsIcon />
      <h4 className="vendors-list-empty__title">
        {t(
          "You have no vendors. Add a vendor you already work with, or find among local vendors."
        )}
      </h4>
      <div className="vendors-list-empty__actions">
        <Button variant="text" appearance="ghost">
          {t("Add a vendor")}
        </Button>
      </div>
    </div>
  );
};
