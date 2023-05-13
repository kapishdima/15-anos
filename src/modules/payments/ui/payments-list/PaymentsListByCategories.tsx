import React from 'react';
import { sortedByCategoriesAlphabet, usePaymentsStore } from '@modules/payments';
import { PaymentsList } from './PaymentsList';
import { paymentsVM } from '../../store/payments.selectors';

export const PaymentsListByCategories: React.FC = () => {
  const payments = usePaymentsStore(paymentsVM);

  return <PaymentsList payments={sortedByCategoriesAlphabet(payments)} hasCardHint />;
};
