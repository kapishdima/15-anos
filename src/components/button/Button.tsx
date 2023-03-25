import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Spinner } from '../layout/Loader/Spinner';

type ButtonProps = PropsWithChildren & {
  type?: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ type = 'button', children, loading, disabled }) => {
  // TODO: Add button variants classes

  return (
    <button type={type} className={classNames('button', 'button-primary')} disabled={disabled}>
      {loading ? <Spinner variant="white" /> : children}
    </button>
  );
};
