import React, { PropsWithChildren } from 'react';
import { AppContent } from '../AppContent/AppContent';
import { AppNavbar } from '../AppNavbar/AppNavbar';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-layout">
      <AppNavbar />
      <AppContent>{children}</AppContent>
    </div>
  );
};
