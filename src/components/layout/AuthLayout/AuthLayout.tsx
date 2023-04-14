import React, { PropsWithChildren } from 'react';

import { useTranslation } from 'react-i18next';

import AngleLeft from '@image/icons/angle-left.svg';

export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="auth-layout">
      <div className="auth-layout__header">
        <div className="back-button">
          <img src={AngleLeft} alt="" />
          {t('Back')}
        </div>
      </div>
      {children}
    </div>
  );
};
