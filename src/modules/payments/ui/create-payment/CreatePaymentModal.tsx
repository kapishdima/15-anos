import React from 'react';

import { useTranslation } from 'react-i18next';

import { Modal } from '@/components';
import { CreatePaymentForm } from './CreatePaymentForm';

type CreatePaymentModalProps = {
  id: string;
  initialValues?: any;
};

export const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({ id, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Modal
      id={id}
      title={t('Payment details')}
      confirmButtonText={t('Save the payment')}
      minWidth="50vw"
      minHeight="90vh">
      <CreatePaymentForm initialValues={initialValues} />
    </Modal>
  );
};
