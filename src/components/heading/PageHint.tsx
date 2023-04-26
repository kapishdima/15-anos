import React, { PropsWithChildren } from 'react';

export const PageHint: React.FC<PropsWithChildren> = ({ children }) => {
  return <h5 className="page-hint">{children}</h5>;
};
