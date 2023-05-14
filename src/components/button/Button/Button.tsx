import classNames from 'classnames';
import React, { HTMLAttributes, PropsWithChildren, MouseEvent } from 'react';

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
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={classNames('button', variant, appearance)}
      disabled={disabled}
      onClick={handleClick}
      {...attrs}>
      {loading ? <Spinner variant="white" /> : children}
    </button>
  );
};
