import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  CategoriesSelect,
  DatepickerField,
  TextAreaField,
  CurrencyField,
} from '@/components';

export const CreatePaymentForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <TextField name="title" label={t('Name')} placeholder={t('Payment name')} />
      <DatepickerField
        name="date"
        label={t('Date')}
        placeholder={t('Select date')}
        showTimeSelect={false}
      />
      <CurrencyField name="pay" label={t('Amount payable')} />
      <CurrencyField name="paid" label={t('Paid')} />
      <CategoriesSelect
        name="categoryId"
        label={t('Task category')}
        placeholder={t('Select category')}
      />
      <TextAreaField name="notes" label={t('Notes')} placeholder={t('Enter notes')} />
    </>
  );
};
