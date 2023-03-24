import React from 'react';

import { Box } from '../../components/layout/Box';
import { LoginForm } from '../../modules/auth/ui/LoginForm';

import AngleLeft from '../../image/icons/angle-left.svg';
import Logo from '../../image/logo.png';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '../../components/hooks/useMediaQuery';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const boxMaxWidth = isMobile ? '90vw' : '35vw';
  return (
    <div className="login-page ">
      <div className="login-page__header">
        <div className="back-button">
          <img src={AngleLeft} alt="" />
          Back
        </div>
      </div>
      <Box maxWidth={boxMaxWidth}>
        <div className="login-form__container">
          <img src={Logo} alt="Quincy" className="logo" />
          <h3 className="login-form__container-title heading1">{t('login_title')}</h3>
          <p className="login-form__container-subtitle subtitle">{t('login_subtitle')}</p>
          <LoginForm />
        </div>
      </Box>
    </div>
  );
};
