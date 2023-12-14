import React, { useCallback, useEffect } from "react";

import { useFormContext } from "react-hook-form";

import { currensies } from "@app/data/currencies";
import { useUserLocation } from "@app/location/useUserLocation";

import { SelectField } from "./SelectField";
import { BaseInputProps } from "./Input";

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
    title: currency.symbol,
  }));

  // useEffect(() => {
  //   if (!autodetect) {
  //     return;
  //   }

  //   const option = options.find(
  //     (option) =>
  //       option.value.toLowerCase() === location?.currency.toLowerCase()
  //   );

  //   setValue(name, option?.value);
  // }, [location?.currency]);

  return (
    <SelectField
      className="select-field--extra-small"
      name={name}
      label={label}
      placeholder={placeholder}
      options={options}
      defaultSelected={location?.currency}
    />
  );
};
