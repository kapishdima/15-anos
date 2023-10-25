import React from "react";
import { useTranslation } from "react-i18next";

import { DropzoneField, TextField, TextAreaField } from "@/components";

export const CreatePurchaseForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
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
      <DropzoneField
        name="image"
        label={"Item image"}
        onUpload={function (files: File): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
