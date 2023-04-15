import React from 'react';
import { sortByDate, usePaymentsStore } from '@modules/payments';
import { PaymentsList } from './PaymentsList';

export const PaymentsListByDate: React.FC = () => {
  const paymentsStore = usePaymentsStore();

  return <PaymentsList payments={sortByDate(paymentsStore.tasksForView)} />;
};
