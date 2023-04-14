import React from 'react';
import { sortByDate, useTasksStore } from '../../store/tasks';
import { TaskList } from './TaskList';

export const TaskListByDate: React.FC = () => {
  const tasksStore = useTasksStore();

  return <TaskList tasks={sortByDate(tasksStore.tasksForView)} />;
};
