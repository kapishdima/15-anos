import React from 'react';

import { GroupedTasks } from '../../store/tasks';
import { TaskGroup } from './TaskGroup';

type TaskListProps = {
  tasks: GroupedTasks;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      {Object.entries(tasks).map(([title, tasks]) => (
        <TaskGroup title={title} tasks={tasks} />
      ))}
    </div>
  );
};
