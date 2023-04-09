import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import useMediaQuery from '../../../components/hooks/useMediaQuery';
import { Box } from '../../../components/layout/Box/Box';
import { LoginForm } from '../shared/LoginForm';

import { authAnonymously } from '../../firebase/auth';
import { Loader } from '../../../components/layout/Loader/Loader';
import { AuthLayout } from '../../../components/layout/AuthLayout/AuthLayout';

import Logo from '../../../image/logo.png';
import { AuthLayoutTitle } from '../../../components/layout/AuthLayout/AuthLayoutTitle';
import { AuthLayoutSubtitle } from '../../../components/layout/AuthLayout/AuthLayoutSubtitle';
import { auth } from '../../firebase';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const boxMaxWidth = isMobile ? '90vw' : '35vw';

  const [_, loading] = useAuthState(auth);

  useEffect(() => {
    authAnonymously();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthLayout>
      <Box maxWidth={boxMaxWidth}>
        <div className="login-form__container">
          <img src={Logo} alt="Quincy" className="logo" />
          <AuthLayoutTitle classes="login-form__container-title">
            {t('login_title')}
          </AuthLayoutTitle>
          <AuthLayoutSubtitle classes="login-form__container-subtitle">
            {t('login_subtitle')}
          </AuthLayoutSubtitle>
          <LoginForm />
        </div>
      </Box>
    </AuthLayout>
  );
};
