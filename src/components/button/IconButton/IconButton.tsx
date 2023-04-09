import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type IconButtonVariants = 'success' | 'primary' | 'error' | 'white';
type IconButtonApearence = 'filled' | 'outline';

type IconButtonProps = PropsWithChildren & {
  onClick?: () => void;
  variant?: IconButtonVariants;
  appearance?: IconButtonApearence;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  appearance = 'filled',
}) => {
  return (
    <button className={classNames('icon-button', variant, appearance)} onClick={onClick}>
      {children}
    </button>
  );
};
