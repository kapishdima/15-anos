import React from 'react';

import { Card, useModal } from '@/components';
import { usePaymentsStore } from '@modules/payments';

import { CreatePaymentModal } from '../create-payment/CreatePaymentModal';
import { createPaymentSchemaValidation } from '../../validations/payments.schema';

type PaymentCardProps = {
  image: string;
  title: string;
  id: string;
  categoryId: string;
  date: Date;
  pay: number;
  paid: number;
  notes: string;
  color?: string;
  completed?: boolean;
  hint?: string;
  isRemoval?: boolean;
  isCompleted?: boolean;
  completedDate?: string;
};

export const PaymentCard: React.FC<PaymentCardProps> = ({
  id,
  title,
  image,
  completed,
  categoryId,
  date,
  notes,
  isRemoval,
  hint,
  paid,
  pay,
  isCompleted,
  completedDate,
  color = '#db5b78',
}) => {
  const removePayment = usePaymentsStore((state) => state.removePayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);
  const updatePayment = usePaymentsStore((state) => state.updatePayment);
  const changePaymentStatus = usePaymentsStore((state) => state.changePaymentStatus);

  const loading = usePaymentsStore((state) => state.loading);

  const PAYMENT_MODAL_ID = `payment-modal-${id}`;

  const { open, close } = useModal();

  const onOpen = () => {
    open(PAYMENT_MODAL_ID);
  };

  const onDelete = (id: string) => {
    removePayment(id);
    fetchPayments(/*force*/ true);
  };

  const onUpdatePayment = async (values: any) => {
    await updatePayment(id, values);
    close(PAYMENT_MODAL_ID);
    fetchPayments(/*force*/ true);
  };

  const onUpdatePaymentStatus = async (id: string) => {
    await changePaymentStatus(id, pay);
    fetchPayments(/*force*/ true);
  };

  return (
    <>
      <Card
        id={id}
        title={title}
        icon={image}
        color={color}
        completed={completed}
        removal={isRemoval}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={onUpdatePaymentStatus}
        hint={hint}
        showHint={!isCompleted}
        showDescription={paid > 0}
        description={isCompleted ? `Paid ${completedDate}` : `Already paid: ${paid} $`}
      />
      <CreatePaymentModal
        id={PAYMENT_MODAL_ID}
        initialValues={{
          title,
          categoryId,
          date,
          notes,
          paid: paid.toString(),
          pay: pay.toString(),
        }}
        validation={createPaymentSchemaValidation}
        onSubmit={onUpdatePayment}
        loading={loading}
      />
    </>
  );
};
