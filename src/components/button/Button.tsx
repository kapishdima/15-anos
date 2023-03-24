import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export const Button: React.FC<PropsWithChildren> = ({ children }) => {
  // TODO: Add button variants classes

  return (
    <button type="button" className={classNames('button', 'button-primary')}>
      {children}
    </button>
  );
};
