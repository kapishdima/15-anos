import classNames from 'classnames';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

import { Spinner } from '@components/index';

type ButtonVariants = 'primary' | 'error' | 'text' | 'success';
type ButtonAppearance = 'filled' | 'ghost';

type ButtonProps = PropsWithChildren &
  HTMLAttributes<HTMLButtonElement> & {
    type?: 'submit' | 'button';
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariants;
    appearance?: ButtonAppearance;
    onClick?: () => void;
  };

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  appearance = 'filled',
  children,
  loading,
  disabled,
  onClick,
  ...attrs
}) => {
  return (
    <button
      type={type}
      className={classNames('button', variant, appearance)}
      disabled={disabled}
      onClick={onClick}
      {...attrs}>
      {loading ? <Spinner variant="white" /> : children}
    </button>
  );
};
