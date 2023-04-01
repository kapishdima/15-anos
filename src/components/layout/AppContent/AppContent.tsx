import React, { PropsWithChildren } from 'react';

export const AppContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="app-content">{children}</div>;
};
