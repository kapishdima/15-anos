import React, { useEffect } from "react";
import {
  AppLayout,
  Button,
  CurrencyField,
  DatepickerField,
  Form,
  NumberField,
  PageHeader,
} from "@components/index";

import { useTranslation } from "react-i18next";
import { useProfileStore } from "@/modules/profile/store/profile";

export const WeddingProfileIndex: React.FC = () => {
  const { t } = useTranslation();

  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );
  const saveProfileDetails = useProfileStore(
    (state) => state.saveProfileDetails
  );

  const loading = useProfileStore((state) => state.loading);
  const profile = useProfileStore((state) => state.profile);

  const initialValues = {
    date: new Date(),
    budget: profile?.budget.toString() || "0",
    guests: profile?.guests,
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
        <PageHeader title="Quinceañera profile" />

        <div className="tasks-info wedding-profile-form">
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <DatepickerField name="date" label="Date" />
            <CurrencyField name="budget" label="Budget" />
            <NumberField
              name="guests"
              label="Number of guests"
              color="#2ecc71"
            />
            <Button type="submit" variant="success">
              {t("Save details")}
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
