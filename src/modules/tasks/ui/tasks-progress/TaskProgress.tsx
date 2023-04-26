import React, { useEffect, useState } from 'react';
import { ProgressCard } from '@components/index';
import { useTasksStore } from '../../store/tasks';

export const TaskProgress: React.FC = () => {
  const total = useTasksStore((state) => state.total);
  const completed = useTasksStore((state) => state.completed);

  console.log(total);
  console.log(completed);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const progress = (completed / total) * 100;
      setValue(progress);
    }, 300);

    return () => clearTimeout(id);
  }, [completed, total]);

  return (
    <ProgressCard
      title="Task Completed"
      value={value}
      hint={`${completed} of ${total} tasks are completed`}
    />
  );
};
