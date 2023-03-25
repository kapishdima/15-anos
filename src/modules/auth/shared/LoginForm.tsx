import React from 'react';

import { useTranslation } from 'react-i18next';

import { Form } from '../../../components/form/Form';
import { Button } from '../../../components/button/Button';
import { PasswordField } from '../../../components/fields/PasswordField';
import { loginSchemaValidation } from '../validation/login.validation';
import { EventTitleField } from './EventTitleField';
import { useLogin } from '../hook/useLogin';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate, isLoading, error, canLogin } = useLogin();
  const onSubmit = async (values: any) => {
    await mutate(values);
  };

  console.log(error);

  return (
    <Form onSubmit={onSubmit} classes="login-form" schema={loginSchemaValidation}>
      <PasswordField placeholder={t('password_placehoder')} name="password" />
      <EventTitleField />
      <Button type="submit" loading={isLoading} disabled={!canLogin}>
        {t('login_button_text')}
      </Button>
    </Form>
  );
};
