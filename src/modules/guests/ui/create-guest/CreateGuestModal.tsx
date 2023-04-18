import React from 'react';

import { useTranslation } from 'react-i18next';

import { Modal } from '@/components';
import { CreateGuestForm } from './CreateGuestForm';

type CreateGuestModalProps = {
  id: string;
  initialValues?: any;
};

export const CreateGuestModal: React.FC<CreateGuestModalProps> = ({ id, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Modal
      id={id}
      title={t('Guest')}
      confirmButtonText={t('Save the guest')}
      minWidth="50vw"
      minHeight="90vh">
      <CreateGuestForm initialValues={initialValues} />
    </Modal>
  );
};
