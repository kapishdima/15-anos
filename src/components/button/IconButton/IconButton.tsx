import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type IconButtonVariants = 'success' | 'primary' | 'error';

type IconButtonProps = PropsWithChildren & {
  onClick?: () => void;
  variant?: IconButtonVariants;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
}) => {
  return (
    <button className={classNames('icon-button', variant)} onClick={onClick}>
      {children}
    </button>
  );
};
