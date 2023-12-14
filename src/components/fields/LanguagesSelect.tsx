import React from "react";
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
}) => {
  const { i18n } = useTranslation();

  const options = languages.map((language) => ({
    icon: language.flag,
    label: language.name,
    value: language.code.toLowerCase(),
  }));

  const includesToLanguages = () => {
    return Boolean(
      languages.find(
        (language) => language.code.toLowerCase() === i18n.language
      )
    );
  };

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value.toLowerCase());
  };

  return (
    <SelectField
      className="select-field--extra-small"
      name={name}
      label={label}
      defaultSelected={
        !i18n.language || !includesToLanguages() ? "en" : i18n.language
      }
      placeholder={placeholder}
      options={options}
      onSelect={changeLanguage}
    />
  );
};
