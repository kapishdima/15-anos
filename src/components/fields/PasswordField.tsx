import React from 'react';

import classNames from 'classnames';
import { BaseInputProps, Input } from './Input';

type PasswordFieldProps = BaseInputProps & {
  placeholder?: string | null;
};

export const PasswordField: React.FC<PasswordFieldProps> = ({ name, placeholder }) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container">
          <input
            type="password"
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
