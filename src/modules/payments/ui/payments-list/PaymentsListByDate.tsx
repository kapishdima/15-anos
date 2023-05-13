import React from 'react';
import { sortedByDate, usePaymentsStore } from '@modules/payments';
import { PaymentsList } from './PaymentsList';
import { paymentsVM } from '../../store/payments.selectors';

export const PaymentsListByDate: React.FC = () => {
  const payments = usePaymentsStore(paymentsVM);

  return <PaymentsList payments={sortedByDate(payments)} />;
};
