import React from 'react';

import classNames from 'classnames';

type TextFieldProps = {
  placeholder?: string;
};

export const TextField: React.FC<TextFieldProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={classNames('form-field', 'text-form-field')}
    />
  );
};
