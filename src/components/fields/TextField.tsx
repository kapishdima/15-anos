import React from 'react';
import { BaseInputProps, Input } from './Input';
import classNames from 'classnames';

type TextFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  name,
  placeholder,
  label,
  suffix,
  type,
  color,
}) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container">
          {label && (
            <label htmlFor={name} className="form-field__label">
              {label}
            </label>
          )}
          <div className="form-input__container">
            <input
              id={name}
              type={type || 'text'}
              placeholder={placeholder || ''}
              className={classNames('form-field', 'text-form-field')}
              name={field.value}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              style={{ color }}
            />
            {suffix && <div className="form-input__suffix">{suffix}</div>}
          </div>
          {fieldState.error && <div className="form-field__error">{fieldState.error.message}</div>}
        </div>
      )}
    </Input>
  );
};
