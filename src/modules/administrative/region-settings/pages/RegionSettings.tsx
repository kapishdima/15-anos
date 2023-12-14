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

  const loading = useProfileStore((state) => state.fetchLoading);
  const saveLoading = useProfileStore((state) => state.saveLoading);
  const country = useProfileStore(getCountyCode);
  const currency = useProfileStore(getCurrencyCode);

  const initialValues = {
    country: country,
    language: "en",
    currency: currency,
  };

  const onSubmit = async (values: any) => {
    const payload = {
      country: values.country,
      currency: values.currency,
    };
    await saveProfileDetails(payload);
    await fetchProfileDetails();
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
            <Button type="submit" variant="success" loading={saveLoading}>
              {t("Save the language and region")}
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
