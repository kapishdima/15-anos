import React, { PropsWithChildren } from 'react';
import { AppContent } from '../AppContent/AppContent';
import { AppNavbar } from '../AppNavbar/AppNavbar';
import { Loader } from '../Loader/Loader';

type AppLayoutProps = PropsWithChildren & {
  loading?: boolean;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ loading, children }) => {
  return (
    <div className="app-layout">
      <AppNavbar />
      <AppContent>{loading ? <Loader></Loader> : children}</AppContent>
    </div>
  );
};
