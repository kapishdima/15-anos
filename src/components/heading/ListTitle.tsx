import React, { PropsWithChildren } from 'react';

export const ListTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="list-title">{children}</h3>;
};
