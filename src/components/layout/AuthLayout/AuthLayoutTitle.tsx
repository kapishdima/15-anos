import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type AuthLayoutTitleProps = PropsWithChildren & {
  classes?: string;
};

export const AuthLayoutTitle: React.FC<AuthLayoutTitleProps> = ({ classes, children }) => {
  return <h3 className={classNames(classes, 'heading1')}>{children}</h3>;
};
