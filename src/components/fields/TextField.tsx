import React, { ChangeEvent } from "react";
import { BaseInputProps, Input } from "./Input";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type TextFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
  iconBefore?: string | any;
  iconAfter?: JSX.Element | string;
  onChange?: (event: ChangeEvent<any>) => void;
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
  onChange,
  variant = "outline",
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
                type={type || "text"}
                placeholder={t(placeholder || "") || ""}
                className={classNames(
                  "form-field",
                  "text-form-field",
                  variant,
                  {
                    "form-field--error": fieldState.error,
                  }
                )}
                name={field.name}
                value={field.value}
                onChange={onChange || field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                style={{ color, ...style }}
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
