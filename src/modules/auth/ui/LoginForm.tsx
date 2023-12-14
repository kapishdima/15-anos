import React from "react";

import { useTranslation } from "react-i18next";

import { Form, Button, PasswordField } from "@components/index";

import { loginSchemaValidation } from "../validation/login.validation";
import { EventTitleField } from "./EventTitleField";
import { useLogin } from "../hook/useLogin";
import { LoginCredentials } from "../@types";

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const { login, isLoading, canLogin } = useLogin();
  console.log(isLoading);

  const onSubmit = async (values: LoginCredentials) => {
    await login(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      classes="login-form"
      schema={loginSchemaValidation}
      resetAfterSubmit={false}
    >
      <PasswordField
        placeholder={t("Enter password")}
        name="password"
        htmlName="password"
        autoComplete="password"
      />
      <EventTitleField />
      <Button type="submit" loading={isLoading} disabled={!canLogin}>
        {t("Log in")}
      </Button>
    </Form>
  );
};
