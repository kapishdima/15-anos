import React from 'react';
import {
  AppLayout,
  Button,
  CountrySelect,
  CurrencySelect,
  Form,
  LanguagesSelect,
  PageHeader,
} from '@components/index';

import { useTranslation } from 'react-i18next';

const initialValues = {
  country: 'uk',
  language: 'uk',
  currency: 'usd',
};

export const RegionSettingsIndex: React.FC = () => {
  const { t } = useTranslation();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AppLayout>
      <div className="home-page">
        <PageHeader title="Language and Region" />

        <div className="tasks-info wedding-profile-form">
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <CountrySelect name="country" label="Country" />
            <LanguagesSelect name="language" label="Language" />
            <CurrencySelect name="currency" label="Currency" />
            <Button variant="success">Save the language and region</Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
