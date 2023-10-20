import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { languages } from "@app/data/languages";

import { SelectField } from "./SelectField";
import { BaseInputProps } from "./Input";

type LanguagesSelectProps = BaseInputProps & {
  placeholder?: string;
  country?: string;
};

export const LanguagesSelect: React.FC<LanguagesSelectProps> = ({
  name,
  label,
  placeholder,
  country,
}) => {
  const { i18n } = useTranslation();

  const options = languages.map((language) => ({
    icon: language.flag,
    label: language.name,
    value: language.code.toLowerCase(),
  }));

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value.toLowerCase());
  };

  return (
    <SelectField
      name={name}
      label={label}
      defaultSelected={
        !i18n.language || i18n.language === "ru" ? "en" : i18n.language
      }
      placeholder={placeholder}
      options={options}
      onSelect={changeLanguage}
    />
  );
};
