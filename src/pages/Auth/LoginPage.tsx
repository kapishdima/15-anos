import React from 'react';
import { PasswordField } from '../../components/fields/PasswordField';
import { TextField } from '../../components/fields/TextField';
import { Button } from '../../components/button/Button';
import { Box } from '../../components/layout/Box';

import AngleLeft from '../../image/icons/angle-left.svg';
import Logo from '../../image/logo.png';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page ">
      <div className="login-page__header">
        <div className="back-button">
          <img src={AngleLeft} alt="" />
          Back
        </div>
      </div>
      <Box maxWidth="35vw">
        <div className="login-form__container">
          <img src={Logo} alt="Quincy" className="logo" />
          <h3 className="login-form__container-title heading1">Enter a password</h3>
          <p className="login-form__container-subtitle subtitle">
            You can find the password in a message you received from a person who invited you
          </p>
          <div className="login-form">
            <PasswordField placeholder="Enter password" />
            <TextField placeholder="Enter event title" />
            <Button>Log in</Button>
          </div>
        </div>
      </Box>
    </div>
  );
};
