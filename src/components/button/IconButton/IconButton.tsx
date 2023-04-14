import classNames from 'classnames';
import React, { MouseEvent, PropsWithChildren } from 'react';

type IconButtonVariants = 'success' | 'primary' | 'error' | 'white';
type IconButtonApearence = 'filled' | 'outline';

type IconButtonProps = PropsWithChildren & {
  onClick?: () => void;
  variant?: IconButtonVariants;
  appearance?: IconButtonApearence;
  classes?: string;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  classes,
  variant = 'primary',
  appearance = 'filled',
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
      className={classNames('icon-button', variant, appearance, classes)}
      onClick={handleClick}>
      {children}
    </button>
  );
};
