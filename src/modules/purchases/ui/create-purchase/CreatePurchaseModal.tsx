import React from 'react';

import { useTranslation } from 'react-i18next';

import { Modal } from '@/components';
import { CreatePurchaseForm } from './CreatePurchaseForm';

type CreatePurchaseModalProps = {
  id: string;
  initialValues?: any;
};

export const CreatePurchaseModal: React.FC<CreatePurchaseModalProps> = ({ id, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Modal
      id={id}
      title={t('Purchase details')}
      confirmButtonText={t('Save the Purchase')}
      minWidth="50vw"
      minHeight="90vh">
      <CreatePurchaseForm initialValues={initialValues} />
    </Modal>
  );
};
