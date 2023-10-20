import React from "react";

import { useTranslation } from "react-i18next";
import i18n from "@/modules/i18n";
import DatePicker from "react-datepicker";

import { BaseInputProps, Input } from "./Input";

import es from "date-fns/locale/es";
import pt from "date-fns/locale/pt";
import en from "date-fns/locale/en-US";

import "react-datepicker/dist/react-datepicker.css";

const locales = { es, pt, en };

type DatepickerFieldProps = BaseInputProps & {
  placeholder?: string | null;
  defaultValue?: Date;
  min?: Date;
  showTimeSelect?: boolean;
};

export const DatepickerField: React.FC<DatepickerFieldProps> = ({
  name,
  min,
  label,
  showTimeSelect = true,
}) => {
  const { t } = useTranslation();
  const locale =
    !i18n.language || i18n.language === "ru" ? "en" : i18n.language;

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
            <DatePicker
              selected={field.value}
              showTimeSelect={showTimeSelect}
              onChange={(date: any) => field.onChange(date)}
              timeFormat="HH:mm"
              dateFormat={
                showTimeSelect ? "MMMM d yyyy - HH:mm" : "MMMM d yyyy"
              }
              minDate={min ? new Date(min) : null}
              // @ts-ignore
              locale={locales[locale]}
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
