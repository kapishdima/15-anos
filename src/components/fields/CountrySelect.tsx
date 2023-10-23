import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { countries } from "@app/data/countries";
import { useUserLocation } from "@app/location/useUserLocation";

import { SelectField } from "./SelectField";
import { BaseInputProps } from "./Input";

type CountrySelectProps = BaseInputProps & {
  placeholder?: string;
  autodetect?: boolean;
};

export const CountrySelect: React.FC<CountrySelectProps> = ({
  name,
  label,
  placeholder,
  autodetect = true,
}) => {
  const location = useUserLocation();
  const { setValue } = useFormContext();

  const options = countries.map((country) => ({
    icon: country.emoji,
    label: country.name,
    value: country.code,
  }));

  useEffect(() => {
    if (!autodetect) {
      return;
    }
    setValue(name, location?.country);
  }, [location, location?.country]);

  return (
    <SelectField
      className="select-field--extra-small"
      name={name}
      label={label}
      placeholder={placeholder}
      options={options}
    />
  );
};
