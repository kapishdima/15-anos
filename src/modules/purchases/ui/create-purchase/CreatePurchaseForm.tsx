import React from 'react';

import { TextField, TextAreaField } from '@/components';
import { useTranslation } from 'react-i18next';

export const CreatePurchaseForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TextField name="title" label={t('Name')} placeholder={t('Item name')} />
      <TextAreaField
        name="description"
        label={t('Description')}
        placeholder={t('Item description')}
      />
      <TextField name="url" label={t('Link')} placeholder={t('Link to an online store')} />
    </>
  );
};
