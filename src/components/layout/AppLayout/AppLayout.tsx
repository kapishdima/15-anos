import React, { PropsWithChildren } from 'react';

import { RolesProvider } from '@modules/roles/RolesProvider';

import { AppContent } from '../AppContent/AppContent';
import { AppNavbar } from '../AppNavbar/AppNavbar';
import { AppLoader } from '../AppLoader/AppLoader';
import classNames from 'classnames';

type AppLayoutProps = PropsWithChildren & {
  loading?: boolean;
  fullWidth?: boolean;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ loading, children, fullWidth }) => {
  return (
    <div className="app-layout">
      <AppNavbar />
      <RolesProvider>
        <AppContent>
          {loading ? (
            <AppLoader />
          ) : (
            <div className={classNames('app-layout__children', { 'full-width': fullWidth })}>
              {children}
            </div>
          )}
        </AppContent>
      </RolesProvider>
    </div>
  );
};
