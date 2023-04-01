import React, { useEffect } from 'react';
import { AuthLayout } from '../../../components/layout/AuthLayout/AuthLayout';
import { Box } from '../../../components/layout/Box/Box';
import { AuthLayoutTitle } from '../../../components/layout/AuthLayout/AuthLayoutTitle';
import { useTranslation } from 'react-i18next';
import { CreateProfileForm } from '../shared/CreateProfileForm';

import Logo from '../../../image/logo.png';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader } from '../../../components/layout/Loader/Loader';
import { authAnonymously } from '../../firebase/auth';

export const CreateProfilePage: React.FC = () => {
  const { t } = useTranslation();

  const [_, loading] = useAuthState(getAuth());

  useEffect(() => {
    authAnonymously();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthLayout>
      <Box classes="create-profile__container" minWidth="35vw">
        <img src={Logo} alt="Quincy" className="logo" />
        <AuthLayoutTitle classes="create-profile__container-title">
          {t('Enter details of your Quinceañera')}
        </AuthLayoutTitle>
        <CreateProfileForm />
      </Box>
    </AuthLayout>
  );
};
