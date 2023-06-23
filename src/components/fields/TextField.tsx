import React, { ChangeEvent } from 'react';
import { BaseInputProps, Input } from './Input';
import classNames from 'classnames';

type TextFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
  iconBefore?: string;
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
  onChange,
  variant = 'outline',
}) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => {
        return (
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
                className={classNames('form-field', 'text-form-field', variant, {
                  'form-field--error': fieldState.error,
                })}
                name={field.name}
                value={field.value}
                onChange={onChange || field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                style={{ color }}
              />
              <div className="form-input__after-icon">
                {iconAfter ? (
                  typeof iconAfter === 'string' ? (
                    <img className="form-input__before-icon" src={iconAfter} alt="" />
                  ) : (
                    iconAfter
                  )
                ) : null}
              </div>
              {suffix && <div className="form-input__suffix">{suffix}</div>}
            </div>
            {fieldState.error && (
              <div className="form-field__error">{fieldState.error.message}</div>
            )}
          </div>
        );
      }}
    </Input>
  );
};
