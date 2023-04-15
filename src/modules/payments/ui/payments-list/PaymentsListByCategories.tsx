import React from 'react';
import { sortByCategoriesAlphabet, usePaymentsStore } from '@modules/payments';
import { PaymentsList } from './PaymentsList';

export const PaymentsListByCategories: React.FC = () => {
  const paymentsStore = usePaymentsStore();

  return <PaymentsList payments={sortByCategoriesAlphabet(paymentsStore.tasksForView)} />;
};
