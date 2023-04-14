import React from 'react';

import { useTranslation } from 'react-i18next';

import { Modal } from '@/components';
import { CreateTaskForm } from './CreateTaskForm';

type CreateTaskModalProps = {
  id: string;
  initialValues?: any;
};

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ id, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Modal
      id={id}
      title={t('Task details')}
      confirmButtonText={t('Save the task')}
      minWidth="50vw"
      minHeight="90vh">
      <CreateTaskForm initialValues={initialValues} />
    </Modal>
  );
};
