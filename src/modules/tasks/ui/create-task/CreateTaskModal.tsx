import React from 'react';

import { useTranslation } from 'react-i18next';

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
  onSubmit,
  loading,
  validation,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      id={id}
      title={t('Task details')}
      confirmButtonText={t('Save the task')}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={onSubmit}
      validation={validation}>
      <CreateTaskForm />
    </Dialog>
  );
};
