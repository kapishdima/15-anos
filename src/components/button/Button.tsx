import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren & {
  type?: 'submit' | 'button';
};

export const Button: React.FC<ButtonProps> = ({ type = 'button', children }) => {
  // TODO: Add button variants classes

  return (
    <button type={type} className={classNames('button', 'button-primary')}>
      {children}
    </button>
  );
};
