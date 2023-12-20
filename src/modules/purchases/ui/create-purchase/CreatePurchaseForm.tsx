import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

import { DropzoneField, TextField, TextAreaField } from "@/components";

export const CreatePurchaseForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { setValue } = useFormContext();

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
        loading={loading}
        onUpload={function (files: File): void {
          setLoading(true);
          setValue("image", files);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
      />
    </>
  );
};
