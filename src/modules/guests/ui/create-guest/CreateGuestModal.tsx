import React from 'react';

import { useTranslation } from 'react-i18next';

import { Dialog } from '@/components';
import { CreateGuestForm } from './CreateGuestForm';
import { UseFormReset, FieldValues } from 'react-hook-form';

type CreateGuestModalProps = {
  id: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
};

const defaultValues = {
  guests: 0,
  kids: 0,
};

export const CreateGuestModal: React.FC<CreateGuestModalProps> = ({
  id,
  initialValues,
  onSubmit,
  loading,
  validation,
}) => {
  const { t } = useTranslation();

  const submit = (values: any, reset?: UseFormReset<FieldValues>) => {
    console.log(values);
    onSubmit(values);
    if (reset) {
      reset();
    }
  };

  return (
    <Dialog
      id={id}
      title={t('Guest')}
      confirmButtonText={t('Save the guest')}
      minWidth="50vw"
      minHeight="90vh"
      onSubmit={submit}
      initialValues={initialValues || defaultValues}
      loading={loading}
      validation={validation}>
      <CreateGuestForm />
    </Dialog>
  );
};
