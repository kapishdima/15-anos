import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { currensies } from '@app/data/currencies';
import { useUserLocation } from '@app/location/useUserLocation';

import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';

type CurrencySelectProps = BaseInputProps & {
  placeholder?: string;
};

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ name, label, placeholder }) => {
  const location = useUserLocation();
  const { setValue } = useFormContext();

  const options = currensies.map((currency) => ({
    label: currency.currencyCode,
    value: currency.currencyCode,
  }));

  useEffect(() => {
    setValue(name, location?.currency);
  }, [location, location?.country]);

  return <SelectField name={name} label={label} placeholder={placeholder} options={options} />;
};
