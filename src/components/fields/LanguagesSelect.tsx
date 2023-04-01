import React, { useEffect } from 'react';
import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';
import { countries } from '../../app/data/countries';
import { languages } from '../../app/data/languages';
import { useFormContext } from 'react-hook-form';
import { useUserLocation } from '../../app/location/useUserLocation';
import { useTranslation } from 'react-i18next';

type LanguagesSelectProps = BaseInputProps & {
  placeholder?: string;
};

export const LanguagesSelect: React.FC<LanguagesSelectProps> = ({ name, label, placeholder }) => {
  const location = useUserLocation();
  const { setValue } = useFormContext();
  const { i18n } = useTranslation();

  const options = languages.map((language) => ({
    icon: countries.find((country) => country.code.toLowerCase() === language.code)?.flag,
    label: language.name,
    value: language.code,
  }));

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value.toLowerCase());
  };

  useEffect(() => {
    setValue(name, location?.country);
  }, [location, location?.country]);

  return (
    <SelectField
      name={name}
      label={label}
      placeholder={placeholder}
      options={options}
      onSelect={changeLanguage}
    />
  );
};
