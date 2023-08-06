import React, { useEffect } from "react";
import {
  AppLayout,
  Button,
  CountrySelect,
  CurrencySelect,
  Form,
  LanguagesSelect,
  PageHeader,
} from "@components/index";

import { useTranslation } from "react-i18next";
import { useProfileStore } from "@/modules/profile/store/profile";
import {
  getCountyCode,
  getCurrencyCode,
} from "../../../profile/store/selector/profile.selector";

export const RegionSettingsIndex: React.FC = () => {
  const { t } = useTranslation();

  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );
  const saveProfileDetails = useProfileStore(
    (state) => state.saveProfileDetails
  );

  const loading = useProfileStore((state) => state.loading);
  const country = useProfileStore(getCountyCode);
  const currency = useProfileStore(getCurrencyCode);

  const initialValues = {
    country: country,
    language: "en",
    currency: currency,
  };

  const onSubmit = async (values: any) => {
    await saveProfileDetails(values);
    await fetchProfileDetails(/*force*/ true);
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  return (
    <AppLayout loading={loading}>
      <div className="home-page">
        <PageHeader title="Language and region" />

        <div className="tasks-info wedding-profile-form">
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <CountrySelect name="country" label="Country" autodetect={false} />
            <LanguagesSelect
              name="language"
              label="Language"
              country={country}
            />
            <CurrencySelect
              name="currency"
              label="Currency"
              autodetect={false}
            />
            <Button type="submit" variant="success">
              {t("Save the language and region")}
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
