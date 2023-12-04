import React, { PropsWithChildren } from "react";

import classNames from "classnames";
import { useAnalytics } from "@app/analytics";
import { RolesProvider } from "@modules/roles/RolesProvider";

import { AppContent } from "../AppContent/AppContent";
import { AppNavbar } from "../AppNavbar/AppNavbar";
import { AppLoader } from "../AppLoader/AppLoader";

type AppLayoutProps = PropsWithChildren & {
  loading?: boolean;
  fullWidth?: boolean;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  loading,
  children,
  fullWidth,
}) => {
  useAnalytics();

  return (
    <RolesProvider>
      <div className="app-layout">
        <AppNavbar />
        <AppContent>
          {loading ? (
            <AppLoader />
          ) : (
            <div
              className={classNames("app-layout__children", {
                "full-width": fullWidth,
              })}
            >
              {children}
            </div>
          )}
        </AppContent>
      </div>
    </RolesProvider>
  );
};
