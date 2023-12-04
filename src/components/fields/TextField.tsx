import React, { ChangeEvent } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { BaseInputProps, Input } from "./Input";
import { capitalize } from "@/app/utils/text";
import { translated } from "@/app/utils/locale";
import { useFormContext } from "react-hook-form";

type TextFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
  iconBefore?: string | any;
  iconAfter?: JSX.Element | string;
  clearOnFocus?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export const TextField: React.FC<TextFieldProps> = ({
  name,
  placeholder,
  label,
  suffix,
  type,
  color,
  iconBefore,
  iconAfter,
  style,
  autoComplete,
  autoFocus,
  htmlName,
  hint,
  clearOnFocus,
  capitilizedWords = false,
  capitilizedInput = false,
  variant = "outline",
  onChange,
  onKeyDown,
}) => {
  const { setValue, getValues } = useFormContext();
  const { t } = useTranslation();

  const onBlur = () => {
    if (!clearOnFocus) {
      return;
    }
    const value = getValues(name);
    setValue(name, value || "0");
  };

  const onFocus = () => {
    if (!clearOnFocus) {
      return;
    }
    const value = getValues(name);
    setValue(name, value !== "0" ? value : "");
  };

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
            <div
              className={classNames("form-input__container", {
                "with-icon": Boolean(iconBefore),
              })}
            >
              {iconBefore ? (
                typeof iconBefore === "string" ? (
                  <img
                    className="form-input__before-icon"
                    src={iconBefore}
                    alt=""
                  />
                ) : (
                  <div className="form-input__before-icon">{iconBefore}</div>
                )
              ) : null}
              <input
                id={name}
                ref={field.ref}
                type={type || "text"}
                name={htmlName}
                value={translated(field.value)}
                placeholder={t(placeholder || "") || ""}
                className={classNames(
                  "form-field",
                  "text-form-field",
                  variant,
                  {
                    "form-field--error": fieldState.error,
                    "form-field--capitalized": capitilizedWords,
                  }
                )}
                onChange={(event) => {
                  if (onChange) {
                    onChange(event);
                  }

                  const value = event.target.value;
                  const capitalizedValue =
                    !capitilizedInput && !capitilizedWords
                      ? value
                      : capitalize(
                          value,
                          capitilizedInput ? "sentence" : "words"
                        );

                  field.onChange(capitalizedValue);
                }}
                onFocus={(event) => {
                  onFocus();
                }}
                onBlur={() => {
                  onBlur();
                  field.onBlur();
                }}
                onKeyDown={onKeyDown}
                style={{ color, ...style }}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
              />
              <div className="form-input__after-icon">
                {iconAfter ? (
                  typeof iconAfter === "string" ? (
                    <img
                      className="form-input__before-icon"
                      src={iconAfter}
                      alt=""
                    />
                  ) : (
                    iconAfter
                  )
                ) : null}
              </div>
              {suffix && <div className="form-input__suffix">{suffix}</div>}
            </div>
            {hint && <div className="form-field__hint">{hint}</div>}
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
