import React from 'react';

import { useTranslation } from 'react-i18next';

import { Card, useModal } from '@/components';
import { usePaymentsStore } from '@modules/payments';
import { getCategoryImage } from '@/app/utils/category-icon';

import { CreatePaymentModal } from '../create-payment/CreatePaymentModal';
import { createPaymentSchemaValidation } from '../../validations/payments.schema';
import { CreatePaymentActions } from '../buttons/CreatePaymentActions';
import { Translated } from '@/app/utils/locale';

type PaymentCardProps = {
  id: string;
  title: Translated;
  categoryId: string;
  date: Date;
  pay: number;
  paid: number;
  notes: string;
  color?: string;
  hint?: string;
  isRemoval?: boolean;
  isCompleted?: boolean;
  completedDate?: string;
};

export const PaymentCard: React.FC<PaymentCardProps> = ({
  id,
  title,
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
  const { t } = useTranslation();
  const PAYMENT_MODAL_ID = `payment-modal-${id}`;

  const removePayment = usePaymentsStore((state) => state.removePayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);
  const updatePayment = usePaymentsStore((state) => state.updatePayment);
  const changePaymentStatus = usePaymentsStore((state) => state.changePaymentStatus);

  const loading = usePaymentsStore((state) => state.loading);

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
    const status = isCompleted ? 'not_paid' : 'paid';
    await changePaymentStatus(id, pay, status);
    close(PAYMENT_MODAL_ID);
    fetchPayments(/*force*/ true);
  };

  return (
    <>
      <Card
        id={id}
        title={title}
        icon={getCategoryImage(categoryId as any)}
        color={color}
        completed={isCompleted}
        removal={isRemoval}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={onUpdatePaymentStatus}
        hint={hint}
        showHint={!isCompleted}
        showDescription={paid > 0}
        description={
          isCompleted ? `${t('Paid')} ${completedDate}` : `${t('Already paid')}: ${paid} $`
        }
      />
      <CreatePaymentModal
        id={PAYMENT_MODAL_ID}
        paymentId={id}
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
        actions={
          <CreatePaymentActions
            modalId={PAYMENT_MODAL_ID}
            isCompleted={Boolean(isCompleted)}
            updatePaymentStatus={() => onUpdatePaymentStatus(id)}
          />
        }
        hasDeleteButton
        hasConfirmButton={false}
      />
    </>
  );
};
