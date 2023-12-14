import React from "react";
import { useTranslation } from "react-i18next";
import { addWeeks } from "date-fns";

import {
  Form,
  TextField,
  Button,
  DatepickerField,
  CurrencyField,
  CountrySelect,
  LanguagesSelect,
  CurrencySelect,
} from "@components/index";

import { useCreateProfile } from "../hook/useCreateProfile";
import { CreateProfileCredentials } from "../@types";
import { useUserLocation } from "@/app/location/useUserLocation";

const date = new Date();
date.setFullYear(new Date().getFullYear() + 1);
date.setHours(12);
date.setMinutes(0);

const minDate = addWeeks(new Date(), 2);

export const CreateProfileForm: React.FC = () => {
  const { t } = useTranslation();
  const { createProfile, isLoading } = useCreateProfile();
  const location = useUserLocation();

  const onSubmit = async (values: CreateProfileCredentials) => {
    await createProfile(values);
  };

  const initialValues = {
    date: new Date(date),
    budget: "0",
    country: location?.country || "",
    currency: location?.currency || "",
    guests: "0",
    language: "",
    market: `${location?.country.toUpperCase()}-web`,
  };

  return (
    <Form
      onSubmit={onSubmit}
      classes="create-profile__form"
      initialValues={initialValues}
      resetAfterSubmit={false}
    >
      <DatepickerField
        min={minDate}
        name="date"
        label={t("When is your Quinceañera?")}
        defaultValue={initialValues.date}
      />
      <CurrencyField
        name="budget"
        label={t("What is the budget approximately?")}
      />
      <TextField
        name="guests"
        label={t("How many guests are you expecting?")}
        type="number"
        color="#2ecc71"
        clearOnFocus
      />
      <CountrySelect
        name="country"
        label={t("Where will be your Quinceañera?")}
        placeholder="Select country"
      />
      <LanguagesSelect
        name="language"
        label={t("What language do you prefer?")}
        placeholder="Select language"
      />
      <CurrencySelect
        name="currency"
        label={t("What currency do you use?")}
        placeholder="Select currency"
      />
      <Button type="submit" loading={isLoading}>
        {t("Create profile")}
      </Button>
    </Form>
  );
};
