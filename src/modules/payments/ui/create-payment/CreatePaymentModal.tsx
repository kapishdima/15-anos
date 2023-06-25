import React from 'react';

import { useTranslation } from 'react-i18next';
import { FieldValues, UseFormReset } from 'react-hook-form';

import { Button, Dialog, useModal } from '@/components';
import { CreatePaymentForm } from './CreatePaymentForm';
import { usePaymentsStore } from '../../store/payments';

type CreatePaymentModalProps = {
  id: string;
  paymentId?: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
  actions?: JSX.Element | null;
  hasDeleteButton?: boolean;
  hasConfirmButton?: boolean;
};

const defaultValues = {
  title: '',
  notes: '',
  date: new Date(),
  pay: '0',
  paid: '0',
  categoryId: 'Artists',
};

export const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({
  id,
  paymentId,
  initialValues,
  onSubmit,
  loading,
  validation,
  actions,
  hasDeleteButton,
  hasConfirmButton,
}) => {
  const { t } = useTranslation();
  const { close } = useModal();

  const removePayment = usePaymentsStore((state) => state.removePayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);

  const submit = (values: any) => {
    onSubmit(values);
  };

  const onDelete = () => {
    if (!paymentId) {
      return;
    }
    removePayment(paymentId);
    fetchPayments(/*force*/ true);
    close(id);
  };

  return (
    <Dialog
      id={id}
      title={t('Payment details')}
      confirmButtonText={t('Save the payment')}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}
      hasConfirmButton={hasConfirmButton}
      actions={
        <>
          {hasDeleteButton ? (
            <Button variant="error" onClick={onDelete}>
              Delete payment
            </Button>
          ) : null}
          {actions}
        </>
      }>
      <CreatePaymentForm />
    </Dialog>
  );
};
