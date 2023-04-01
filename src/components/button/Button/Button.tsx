import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Spinner } from '../../layout/Loader/Spinner';

type ButtonVariants = 'primary' | 'error' | 'text';
type ButtonAppearance = 'filled' | 'ghost';

type ButtonProps = PropsWithChildren & {
  type?: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariants;
  appearance?: ButtonAppearance;
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  appearance = 'filled',
  children,
  loading,
  disabled,
}) => {
  return (
    <button type={type} className={classNames('button', variant, appearance)} disabled={disabled}>
      {loading ? <Spinner variant="white" /> : children}
    </button>
  );
};
