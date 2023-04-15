import React from 'react';

import { GroupedTasks } from '../../store/payments';
import { PaymentGroup } from './PaymentGroup';

type PaymentsListProps = {
  payments: GroupedTasks;
};

export const PaymentsList: React.FC<PaymentsListProps> = ({ payments }) => {
  return (
    <div className="task-list">
      {Object.entries(payments).map(([title, tasks]) => (
        <PaymentGroup title={title} tasks={tasks} key={title} />
      ))}
    </div>
  );
};
