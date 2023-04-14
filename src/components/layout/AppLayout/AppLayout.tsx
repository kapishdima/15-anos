import React, { PropsWithChildren } from 'react';

import { RolesProvider } from '@modules/roles/RolesProvider';

import { AppContent } from '../AppContent/AppContent';
import { AppNavbar } from '../AppNavbar/AppNavbar';
import { AppLoader } from '../AppLoader/AppLoader';

type AppLayoutProps = PropsWithChildren & {
  loading?: boolean;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ loading, children }) => {
  return (
    <div className="app-layout">
      <AppNavbar />
      <RolesProvider>
        <AppContent>
          {loading ? <AppLoader /> : <div className="app-layout__children">{children}</div>}
        </AppContent>
      </RolesProvider>
    </div>
  );
};
