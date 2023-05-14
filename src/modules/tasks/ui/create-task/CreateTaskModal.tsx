import React from 'react';

import { useTranslation } from 'react-i18next';
import { FieldValues, UseFormReset } from 'react-hook-form';

import { Dialog } from '@/components';
import { CreateTaskForm } from './CreateTaskForm';

type CreateTaskModalProps = {
  id: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
};

const defaultValues = {
  date: new Date(),
  categoryId: '',
  notes: '',
  title: '',
};

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
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
      title={t('Task details')}
      confirmButtonText={t('Save the task')}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}>
      <CreateTaskForm />
    </Dialog>
  );
};
