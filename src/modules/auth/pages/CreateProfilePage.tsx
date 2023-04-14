import React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout, Box, AuthLayoutTitle } from '@components/index';

import { CreateProfileForm } from '../ui/CreateProfileForm';

import Logo from '@image/logo.png';

export const CreateProfilePage: React.FC = () => {
  const { t } = useTranslation();

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
