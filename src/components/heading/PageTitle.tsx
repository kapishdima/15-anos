import React, { PropsWithChildren } from 'react';

export const PageTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="page-title">{children}</h2>;
};
