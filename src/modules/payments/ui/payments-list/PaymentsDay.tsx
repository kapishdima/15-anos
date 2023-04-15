import React from 'react';

import isToday from 'date-fns/isToday';
import isPast from 'date-fns/isPast';
import classNames from 'classnames';

import { TaskViewModal } from '../../store/payments';

type PaymentDayProps = {
  title: string;
  tasks: TaskViewModal[];
};

export const PaymentDay: React.FC<PaymentDayProps> = ({ tasks, title }) => {
  const hasExpiresTasks = tasks.filter((task) => !task.isCompleted).length > 0;
  const hasDayPassed = !isToday(new Date(title)) && isPast(new Date(title));

  return (
    <div
      className={classNames('task-list__group-title', {
        expires: hasExpiresTasks && hasDayPassed,
      })}>
      {title}
    </div>
  );
};
