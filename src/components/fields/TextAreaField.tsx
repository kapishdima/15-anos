import React from 'react';
import { BaseInputProps, Input } from './Input';
import classNames from 'classnames';

type TextAreaFieldProps = BaseInputProps & {
  placeholder?: string | null;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  placeholder,
  label,
  suffix,
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
          <div className="form-input__container form-textarea__container">
            <textarea
              id={name}
              placeholder={placeholder || ''}
              className={classNames('form-field', 'text-form-field')}
              name={field.value}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          </div>
          {fieldState.error && <div className="form-field__error">{fieldState.error.message}</div>}
        </div>
      )}
    </Input>
  );
};
