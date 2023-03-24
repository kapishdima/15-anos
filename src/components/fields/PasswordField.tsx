import React from 'react';

import classNames from 'classnames';

type PasswordFieldProps = {
  placeholder?: string;
};

export const PasswordField: React.FC<PasswordFieldProps> = ({ placeholder }) => {
  return (
    <input
      type="password"
      placeholder={placeholder}
      className={classNames('form-field', 'input-placeholder', 'password-form-field')}
    />
  );
};
