import React from "react";

import { TextField, TextAreaField } from "@/components";
import { useTranslation } from "react-i18next";
import { DropzoneField } from "@/components/fields/DropzoneField";

export const CreatePurchaseForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <DropzoneField name="image" label={"Item image"} />
      <TextField
        name="title"
        label={t("Name")}
        placeholder={t("Item name")}
        capitilizedInput
      />
      <TextAreaField
        name="description"
        label={t("Description")}
        placeholder={t("Item description")}
        capitilizedInput
      />
      <TextField
        name="url"
        label={t("Link")}
        placeholder={t("Link to an online store")}
      />
    </>
  );
};
