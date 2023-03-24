import React from 'react';
import { Form } from '../../../components/form/Form';
import { Button } from '../../../components/button/Button';
import { PasswordField } from '../../../components/fields/PasswordField';
import { loginSchemaValidation } from '../validation/login.validation';
import { EventTitleField } from './EventTitleField';
import { useTranslation } from 'react-i18next';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form onSubmit={onSubmit} classes="login-form" schema={loginSchemaValidation}>
      <PasswordField placeholder={t('password_placehoder')} name="password" />
      <EventTitleField />
      <Button type="submit">{t('login_button_text')}</Button>
    </Form>
  );
};
