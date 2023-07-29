import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { countries } from '@app/data/countries';
import { languages } from '@app/data/languages';
import { useUserLocation } from '@app/location/useUserLocation';

import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';

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
  const location = useUserLocation();
  const { setValue } = useFormContext();
  const { i18n } = useTranslation();

  const options = languages.map((language) => ({
    icon: language.flag,
    label: language.name,
    value: language.code,
  }));

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value.toLowerCase());
  };

  useEffect(() => {
    setValue(
      name,
      languages.find((language) => location?.country.toLowerCase() === language.code) || 'en',
    );
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
