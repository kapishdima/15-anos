import React from 'react';
import { AppLayout, Button, Form, PageHeader } from '@components/index';

import { useTranslation } from 'react-i18next';
import { DropzoneField } from '@/components/fields/DropzoneField';
import { Colors } from '../ui/Colors/Colors';

const initialValues = {
  countdown: 'red',
  upper_bar: 'red',
  lower_bar: 'red',
  invitation: 'red',
  invitation_text: 'red',
};

export const DesignSettingsIndex: React.FC = () => {
  const { t } = useTranslation();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AppLayout>
      <div className="home-page">
        <PageHeader title="Design" />

        <div className="tasks-info wedding-profile-form">
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <Colors />
            <DropzoneField name="image" label="Main image" />
            <Button variant="success">{t('Save the design')}</Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
