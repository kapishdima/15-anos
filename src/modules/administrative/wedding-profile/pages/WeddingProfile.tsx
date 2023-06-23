import React from 'react';
import {
  AppLayout,
  Button,
  CurrencyField,
  DatepickerField,
  Form,
  NumberField,
  PageHeader,
} from '@components/index';

import { useTranslation } from 'react-i18next';

const initialValues = {
  date: new Date(),
  budget: '1000',
  guests: 10,
};

export const WeddingProfileIndex: React.FC = () => {
  const { t } = useTranslation();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AppLayout>
      <div className="home-page">
        <PageHeader title="Wedding Details" />

        <div className="tasks-info wedding-profile-form">
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <DatepickerField name="date" label="Date" />
            <CurrencyField name="budget" label="Budget" />
            <NumberField name="guests" label="Number of guests" color="#2ecc71" />
            <Button variant="success">Save details</Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
