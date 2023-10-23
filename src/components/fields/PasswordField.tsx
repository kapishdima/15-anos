import React from "react";

import classNames from "classnames";
import { BaseInputProps, Input } from "./Input";

type PasswordFieldProps = BaseInputProps & {
  placeholder?: string | null;
};

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  placeholder,
  autoComplete,
  htmlName,
}) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container">
          <input
            type="text"
            placeholder={placeholder || ""}
            className={classNames("form-field", "text-form-field")}
            name={htmlName}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            autoComplete={autoComplete}
          />
          {fieldState.error && (
            <div className="form-field__error">{fieldState.error.message}</div>
          )}
        </div>
      )}
    </Input>
  );
};
