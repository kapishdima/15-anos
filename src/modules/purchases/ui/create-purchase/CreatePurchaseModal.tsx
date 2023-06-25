import React from 'react';

import { useTranslation } from 'react-i18next';

import { Dialog } from '@/components';
import { CreatePurchaseForm } from './CreatePurchaseForm';
import { FieldValues, UseFormReset } from 'react-hook-form';

const defaultValues = {
  title: '',
  description: '',
  url: '',
  image: '',
};

type CreatePurchaseModalProps = {
  id: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
};

export const CreatePurchaseModal: React.FC<CreatePurchaseModalProps> = ({
  id,
  initialValues,
  loading,
  validation,
  onSubmit,
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
      title={t('Purchase details')}
      confirmButtonText={t('Save the Purchase')}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}>
      <CreatePurchaseForm />
    </Dialog>
  );
};
