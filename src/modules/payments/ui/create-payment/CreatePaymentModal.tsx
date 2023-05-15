import React from 'react';

import { useTranslation } from 'react-i18next';
import { FieldValues, UseFormReset } from 'react-hook-form';

import { Dialog } from '@/components';
import { CreatePaymentForm } from './CreatePaymentForm';

type CreatePaymentModalProps = {
  id: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
};

const defaultValues = {
  title: '',
  notes: '',
  date: new Date(),
  pay: '0',
  paid: '0',
};

export const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({
  id,
  initialValues,
  onSubmit,
  loading,
  validation,
}) => {
  const { t } = useTranslation();

  const submit = (values: any, reset?: UseFormReset<FieldValues>) => {
    onSubmit(values);
    if (reset) {
      reset();
    }
  };

  return (
    <Dialog
      id={id}
      title={t('Payment details')}
      confirmButtonText={t('Save the payment')}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}>
      <CreatePaymentForm />
    </Dialog>
  );
};
