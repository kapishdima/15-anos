import React from 'react';

import { PlusIcon } from '@components/icons';
import { IconButton, useModal } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { CreatePaymentModal } from '../create-payment/CreatePaymentModal';
import { usePaymentsStore } from '../../store/payments';
import { createPaymentSchemaValidation } from '../../validations/payments.schema';

const CREATE_PAYMENT_MODAL = 'create_payment';

export const CreatePayment: React.FC = () => {
  const { open, close } = useModal();

  const loading = usePaymentsStore((state) => state.loading);
  const addPayment = usePaymentsStore((state) => state.addPayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);

  const onClick = () => {
    open(CREATE_PAYMENT_MODAL);
  };

  const createPayment = async (values: any) => {
    await addPayment(values);
    close(CREATE_PAYMENT_MODAL);
    fetchPayments(/*force*/ true);
  };

  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreatePaymentModal
        id={CREATE_PAYMENT_MODAL}
        onSubmit={createPayment}
        loading={loading}
        validation={createPaymentSchemaValidation}
      />
    </Protected>
  );
};
