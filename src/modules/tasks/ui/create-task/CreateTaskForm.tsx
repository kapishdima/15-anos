import { Form, TextField, CategoriesSelect, DatepickerField, TextAreaField } from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  date: new Date(),
};

type CreateTaskFormProps = {
  initialValues?: any;
};

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ initialValues }) => {
  const { t } = useTranslation();
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues || defaultValues}>
      <TextField name="name" label={t('Name')} placeholder={t('Enter task name')} />
      <DatepickerField name="date" label={t('Date')} placeholder={t('Select date')} />
      <CategoriesSelect
        name="category"
        label={t('Payment category')}
        placeholder={t('Select category')}
      />
      <TextAreaField name="notes" label={t('Notes')} placeholder={t('Enter notes')} />
    </Form>
  );
};
