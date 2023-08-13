import React from "react";
import { AppLayout, PageHeader } from "@/components";
import { useTranslation } from "react-i18next";

import { CreateVendor } from "../ui/button/CreateVendor/CreateVendor";
import { RemoveVendor } from "../ui/button/RemoveVendor/RemoveVendor";
import { ManualVendorsList } from "../ui/vendors-list/ManualVendorsList";
import { SearchVendorIntoMap } from "../ui/button/SearchVendorIntoMap/SearchVendorIntoMap";

export const VendorsIndex: React.FC = () => {
  const { t } = useTranslation();

  // useEffect(() => {
  //   deleteVendor("BanquetesLemontsOficial108MexicoCity");
  // }, []);

  return (
    <AppLayout>
      <PageHeader
        title={t("Vendors")}
        hasBackButton
        actions={
          <>
            <RemoveVendor />
            <CreateVendor />
          </>
        }
      />

      <div className="vendors-page-container">
        <ManualVendorsList />
        <SearchVendorIntoMap />
      </div>
    </AppLayout>
  );
};
