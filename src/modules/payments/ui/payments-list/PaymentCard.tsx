import React from 'react';

import { Card, useModal } from '@/components';
import { usePaymentsStore } from '@modules/payments';

import { CreatePaymentModal } from '../create-payment/CreatePaymentModal';

type PaymentCardProps = {
  image: string;
  name: string;
  id: string;
  category: string;
  date: Date;
  notes: string;
  isRemoval?: boolean;
  color?: string;
  completed?: boolean;
};

export const PaymentCard: React.FC<PaymentCardProps> = ({
  id,
  name,
  image,
  completed,
  category,
  date,
  notes,
  isRemoval,
  color = '#db5b78',
}) => {
  const paymentsStore = usePaymentsStore();
  const PAYMENT_MODAL_ID = `payment-modal-${id}`;

  const { open } = useModal();

  const onOpen = () => {
    open(PAYMENT_MODAL_ID);
  };

  const onDelete = (id: string) => {
    paymentsStore.removeTask(id);
  };

  return (
    <>
      <Card
        id={id}
        title={name}
        icon={image}
        color={color}
        completed={completed}
        removal={isRemoval}
        onOpen={onOpen}
        onDelete={onDelete}
      />
      <CreatePaymentModal id={PAYMENT_MODAL_ID} initialValues={{ name, category, date, notes }} />
    </>
  );
};
