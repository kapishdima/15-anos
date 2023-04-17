import React, { useEffect, useState } from 'react';
import { ProgressBar } from '@components/index';

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
    <div className="task-progress">
      <h4 className="task-progress__title">Task Completed</h4>
      <div className="task-progressbar">
        <ProgressBar value={Math.ceil(value)} />
      </div>
      <h5 className="task-progress__subtitle">
        {completed} of {total} tasks are completed
      </h5>
    </div>
  );
};
