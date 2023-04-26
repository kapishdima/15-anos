import React from 'react';
import { TaskList } from './TaskList';
import { useTasksStore } from '../../store/tasks';
import { sortedByDate, tasksVM } from '../../store/tasks.selectors';

export const TaskListByDate: React.FC = () => {
  const tasks = useTasksStore(tasksVM);

  return <TaskList tasks={sortedByDate(tasks)} />;
};
