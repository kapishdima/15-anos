import {
  Form,
  TextField,
  CategoriesSelect,
  DatepickerField,
  TextAreaField,
  CurrencyField,
} from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  date: new Date(),
  payable: '0',
  paid: '0',
};

type CreatePurchaseFormProps = {
  initialValues?: any;
};

export const CreatePurchaseForm: React.FC<CreatePurchaseFormProps> = ({ initialValues }) => {
  const { t } = useTranslation();
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues || defaultValues}>
      <TextField name="name" label={t('Name')} placeholder={t('Item name')} />
      <TextAreaField name="notes" label={t('Description')} placeholder={t('Item description')} />
      <TextField name="notes" label={t('Link')} placeholder={t('Link to an online store')} />
    </Form>
  );
};
