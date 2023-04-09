import React from 'react';
import isPast from 'date-fns/isPast';
import isSameMonth from 'date-fns/isSameMonth';
import classNames from 'classnames';

import { TaskViewModal } from '../../store/tasks';

type TaskMonthProps = {
  title: string;
  tasks: TaskViewModal[];
};

export const TaskMonth: React.FC<TaskMonthProps> = ({ title, tasks }) => {
  const hasExpiresTasks = tasks.filter((task) => !task.isCompleted).length > 0;
  const hasMonthPassed = !isSameMonth(new Date(), tasks[0].date) && isPast(tasks[0].date);

  return (
    <div className={classNames('task-list__month', { expires: hasExpiresTasks && hasMonthPassed })}>
      {title}
    </div>
  );
};
