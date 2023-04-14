import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { countries } from '@app/data/countries';
import { useUserLocation } from '@app/location/useUserLocation';

import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';

type CountrySelectProps = BaseInputProps & {
  placeholder?: string;
};

export const CountrySelect: React.FC<CountrySelectProps> = ({ name, label, placeholder }) => {
  const location = useUserLocation();
  const { setValue } = useFormContext();

  const options = countries.map((country) => ({
    icon: country.flag,
    label: country.name,
    value: country.code,
  }));

  useEffect(() => {
    setValue(name, location?.country);
  }, [location, location?.country]);

  return <SelectField name={name} label={label} placeholder={placeholder} options={options} />;
};
