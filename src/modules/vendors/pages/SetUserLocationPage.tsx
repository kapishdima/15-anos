import React from "react";

import { useTranslation } from "react-i18next";

import { AppLayout, FormContent, PageHeader, Slider } from "@/components";

import { Map } from "@/modules/map";
import { Autoplay } from "swiper";
import { VendorBanner } from "../ui/vendor-banner/VendorBanner";

export const SetUserLocationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <PageHeader title={t("City")} hasBackButton />

      <div className="vendors-page-container">
        <VendorBanner />
        <FormContent>
          <Map />
        </FormContent>
      </div>
    </AppLayout>
  );
};
