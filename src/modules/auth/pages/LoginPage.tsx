import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  useMediaQuery,
  AuthLayout,
  AuthLayoutTitle,
  AuthLayoutSubtitle,
} from '@components/index';

import { LoginForm } from '../ui/LoginForm';

import Logo from '@image/logo.png';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const boxMaxWidth = isMobile ? '90vw' : '35vw';

  return (
    <AuthLayout>
      <Box maxWidth={boxMaxWidth}>
        <div className="login-form__container">
          <img src={Logo} alt="Quincy" className="logo" />
          <AuthLayoutTitle classes="login-form__container-title">
            {t('Enter a password')}
          </AuthLayoutTitle>
          <AuthLayoutSubtitle classes="login-form__container-subtitle">
            {t('You can find the password in a message you received from a person who invited you')}
          </AuthLayoutSubtitle>
          <LoginForm />
        </div>
      </Box>
    </AuthLayout>
  );
};
