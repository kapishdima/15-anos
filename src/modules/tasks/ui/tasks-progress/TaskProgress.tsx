import React, { useEffect, useState } from 'react';
import { ProgressCard } from '@components/index';

type TaskProgressProps = {
  total: number;
  completed: number;
};

export const TaskProgress: React.FC<TaskProgressProps> = ({ total, completed }) => {
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
