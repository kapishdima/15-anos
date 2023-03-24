import React from 'react';
import { BaseInputProps, Input } from './Input';
import classNames from 'classnames';

type TextFieldProps = BaseInputProps & {
  placeholder?: string | null;
};

export const TextField: React.FC<TextFieldProps> = ({ name, placeholder }) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container">
          <input
            type="text"
            placeholder={placeholder || ''}
            className={classNames('form-field', 'text-form-field')}
            name={field.value}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
          />
          {fieldState.error && <div className="form-field__error">{fieldState.error.message}</div>}
        </div>
      )}
    </Input>
  );
};
