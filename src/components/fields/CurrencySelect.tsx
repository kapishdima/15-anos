import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { currensies } from '@app/data/currencies';
import { useUserLocation } from '@app/location/useUserLocation';

import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';

type CurrencySelectProps = BaseInputProps & {
  placeholder?: string;
  autodetect?: boolean;
};

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  name,
  label,
  placeholder,
  autodetect = true,
}) => {
  const location = useUserLocation();
  const { setValue } = useFormContext();

  const options = currensies.map((currency) => ({
    label: currency.name,
    value: currency.code,
    icon: currency.symbol_native,
  }));

  useEffect(() => {
    if (!autodetect) {
      return;
    }
    setValue(name, location?.currency);
  }, [location, location?.country]);

  return <SelectField name={name} label={label} placeholder={placeholder} options={options} />;
};
