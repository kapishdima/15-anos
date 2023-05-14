import React from 'react';
import { BaseInputProps, Input } from './Input';
import classNames from 'classnames';

type TextFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
  iconBefore?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  name,
  placeholder,
  label,
  suffix,
  type,
  color,
  iconBefore,
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
          <div
            className={classNames('form-input__container', { 'with-icon': Boolean(iconBefore) })}>
            {iconBefore ? (
              <img className="form-input__before-icon" src={iconBefore} alt="" />
            ) : null}
            <input
              id={name}
              type={type || 'text'}
              placeholder={placeholder || ''}
              className={classNames('form-field', 'text-form-field', {
                'form-field--error': fieldState.error,
              })}
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
