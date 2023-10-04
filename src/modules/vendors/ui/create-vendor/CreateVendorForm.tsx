import React from "react";
import { TextField, CategoriesSelect, TextAreaField } from "@/components";
import { useTranslation } from "react-i18next";
import { ContactsCreator } from "../contacts-creator/ContactsCreator";

export const CreateVendorForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        name="title"
        label={t("Name")}
        placeholder={t("Name")}
        capitilizedInput
      />
      <CategoriesSelect
        name="categoryId"
        label={t("Select category")}
        placeholder={t("Select category")}
      />
      <ContactsCreator />
      <TextAreaField
        name="notes"
        label={t("Notes")}
        placeholder={t("Enter notes")}
        capitilizedInput
      />
    </>
  );
};
