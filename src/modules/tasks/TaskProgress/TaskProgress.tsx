import React from 'react';
import { ProgressBar } from '../../../components/progress/ProgressBar';

type TaskProgressProps = {
  total: number;
  completed: number;
};

export const TaskProgress: React.FC<TaskProgressProps> = ({ total, completed }) => {
  return (
    <div className="task-progress">
      <h4 className="task-progress__title">Task Completed</h4>
      <div className="task-progressbar">
        <ProgressBar value={Math.ceil(completed / total) * 100} />
      </div>
      <h5 className="task-progress__subtitle">
        {completed} of {total} tasks are completed
      </h5>
    </div>
  );
};
