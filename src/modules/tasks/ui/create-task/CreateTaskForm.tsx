import React from "react";
import {
  TextField,
  CategoriesSelect,
  DatepickerField,
  TextAreaField,
} from "@/components";
import { useTranslation } from "react-i18next";

export const CreateTaskForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        name="title"
        label={t("Name")}
        placeholder={t("Task name")}
        capitilizedInput
      />
      <DatepickerField
        name="date"
        label={t("Date")}
        placeholder={t("Select date")}
        showTimeSelect={false}
      />
      <CategoriesSelect
        name="categoryId"
        label={t("Select category")}
        placeholder={t("Select category")}
      />
      <TextAreaField
        name="notes"
        label={t("Notes")}
        placeholder={t("Enter notes")}
        capitilizedInput
      />
    </>
  );
};
