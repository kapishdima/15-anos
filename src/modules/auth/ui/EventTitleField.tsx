import React from "react";
import { useTranslation } from "react-i18next";

import { TextField } from "@components/index";

import { useEventTitleField } from "../hook/useEventTitleField";

export const EventTitleField: React.FC = () => {
  const shown = useEventTitleField();
  const { t } = useTranslation();

  if (!shown) {
    return null;
  }

  return (
    <TextField
      placeholder={t("Enter event title")}
      name="eventTitle"
      htmlName="username"
      autoComplete="username"
      autoFocus
    />
  );
};
