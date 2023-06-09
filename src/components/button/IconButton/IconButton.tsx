import { Spinner } from '@/components';
import classNames from 'classnames';
import React, { MouseEvent, PropsWithChildren } from 'react';

type IconButtonVariants = 'success' | 'primary' | 'error' | 'white';
type IconButtonApearence = 'filled' | 'outline';
type IconButtonSizes = 'md' | 'lg';

type IconButtonProps = PropsWithChildren & {
  onClick?: () => void;
  variant?: IconButtonVariants;
  appearance?: IconButtonApearence;
  size?: IconButtonSizes;
  classes?: string;
  loading?: boolean;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  classes,
  loading,
  variant = 'primary',
  appearance = 'filled',
  size = 'md',
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classNames('icon-button', variant, appearance, size, classes)}
      onClick={handleClick}>
      {loading ? <Spinner variant="white" /> : children}
    </button>
  );
};
