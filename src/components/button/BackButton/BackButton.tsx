import React from 'react';

import { BackIcon } from '@components/index';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BackButton: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="back-button" onClick={onClick}>
      <BackIcon />
      <div className="back-button__title">{t('Back')}</div>
    </div>
  );
};
