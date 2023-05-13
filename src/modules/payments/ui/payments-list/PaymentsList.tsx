import React from 'react';

import { GroupedPayments } from '../../store/payments';
import { PaymentGroup } from './PaymentGroup';

type PaymentsListProps = {
  payments: GroupedPayments;
  hasCardHint?: boolean;
};

export const PaymentsList: React.FC<PaymentsListProps> = ({ payments, hasCardHint }) => {
  return (
    <div className="task-list">
      {Object.entries(payments).map(([title, payments]) => (
        <PaymentGroup title={title} payments={payments} key={title} hasCardHint={hasCardHint} />
      ))}
    </div>
  );
};
