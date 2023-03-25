import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import useMediaQuery from '../../../components/hooks/useMediaQuery';
import { Box } from '../../../components/layout/Box/Box';
import { LoginForm } from '../shared/LoginForm';

import AngleLeft from '../../../image/icons/angle-left.svg';
import Logo from '../../../image/logo.png';
import { authAnonymously } from '../../firebase/auth';
import { getAuth } from 'firebase/auth';
import { Loader } from '../../../components/layout/Loader/Loader';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const boxMaxWidth = isMobile ? '90vw' : '35vw';

  const [user, loading] = useAuthState(getAuth());

  useEffect(() => {
    authAnonymously();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
