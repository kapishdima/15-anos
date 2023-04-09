import React from 'react';

import isToday from 'date-fns/isToday';
import classNames from 'classnames';

import { TaskViewModal } from '../../store/tasks';
import isPast from 'date-fns/isPast';

type TasksDayProps = {
  title: string;
  tasks: TaskViewModal[];
};

export const TasksDay: React.FC<TasksDayProps> = ({ tasks, title }) => {
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
