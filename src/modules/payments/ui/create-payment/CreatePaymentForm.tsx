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

type CreatePaymentFormProps = {
  initialValues?: any;
};

export const CreatePaymentForm: React.FC<CreatePaymentFormProps> = ({ initialValues }) => {
  const { t } = useTranslation();
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues || defaultValues}>
      <TextField name="name" label={t('Name')} placeholder={t('Enter payment name')} />
      <DatepickerField name="date" label={t('Date')} placeholder={t('Select date')} />
      <CurrencyField name="payable" label={t('Amount payable')} />
      <CurrencyField name="paid" label={t('Paid')} />
      <CategoriesSelect
        name="category"
        label={t('Task category')}
        placeholder={t('Select category')}
      />
      <TextAreaField name="notes" label={t('Notes')} placeholder={t('Enter notes')} />
    </Form>
  );
};
