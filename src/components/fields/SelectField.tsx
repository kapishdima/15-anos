import React from "react";
import { BaseInputProps, Input } from "./Input";
import { Option, Select } from "../select/Select";
import { useTranslation } from "react-i18next";

type SelectFieldProps = BaseInputProps & {
  options: Option[];
  placeholder?: string;
  defaultSelected?: string;
  onSelect?: (value: string) => void;
  appearence?: "select" | "button";
  className?: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  options,
  label,
  name,
  placeholder,
  defaultSelected,
  variant,
  className,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <Input name={name}>
      {({ field, fieldState }) => {
        return (
          <div className="form-field__container">
            {label && (
              <label htmlFor={name} className="form-field__label">
                {t(label)}
              </label>
            )}
            <Select
              defaultSelected={
                defaultSelected || field.value || options[0].value
              }
              placeholder={placeholder}
              options={options}
              invalid={Boolean(fieldState.error)}
              onSelect={(value: string) => {
                if (onSelect) {
                  onSelect(value);
                }
                field.onChange(value);
              }}
              variant={variant}
              className={className}
            />
            {fieldState.error && (
              <div className="form-field__error">
                {fieldState.error.message}
              </div>
            )}
          </div>
        );
      }}
    </Input>
  );
};
