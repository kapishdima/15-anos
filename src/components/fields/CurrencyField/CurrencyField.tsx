import React, { useState } from "react";

import { BaseInputProps, Input } from "../Input";
import { MaskedField } from "../MaskedField";
import { useCurrencyField } from "./useCurrencyField";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CurrencyFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
};

export const CurrencyField: React.FC<CurrencyFieldProps> = ({
  name,
  placeholder,
  label,
  type,
}) => {
  const { t } = useTranslation();
  const { setValue, getValues } = useFormContext();
  const [mask, setMask] = useState({
    name: "num USD",
    blocks: {
      num: { mask: Number, thousandsSeparator: " ", min: 0, signed: false },
    },
  });

  useCurrencyField((value) => {
    setMask({
      name: `num ${value ? value.toString() : "0"}`,
      blocks: {
        num: { mask: Number, thousandsSeparator: " ", min: 0, signed: false },
      },
    });
  });

  const onBlur = () => {
    const value = getValues(name);
    setValue(name, value || "0");
  };

  const onFocus = () => {
    const value = getValues(name);
    setValue(name, value !== "0" ? value : "");
  };

  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container" onBlur={onBlur}>
          {label && (
            <label htmlFor={name} className="form-field__label">
              {t(label)}
            </label>
          )}
          <div className="form-input__container" onFocus={onFocus}>
            <MaskedField {...field} mask={mask.name} blocks={mask.blocks} />
          </div>
          {fieldState.error && (
            <div className="form-field__error">{fieldState.error.message}</div>
          )}
        </div>
      )}
    </Input>
  );
};
