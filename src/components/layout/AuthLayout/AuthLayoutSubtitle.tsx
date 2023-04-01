import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type AuthLayoutSubtitleProps = PropsWithChildren & {
  classes?: string;
};

export const AuthLayoutSubtitle: React.FC<AuthLayoutSubtitleProps> = ({ classes, children }) => {
  return <h3 className={classNames(classes, 'subtitle')}>{children}</h3>;
};
