import React from 'react';
import { sortByCategoriesAlphabet, useTasksStore } from '../../store/tasks';
import { TaskList } from './TaskList';

export const TaskListByCategories: React.FC = () => {
  const tasksStore = useTasksStore();

  return <TaskList tasks={sortByCategoriesAlphabet(tasksStore.tasks)} />;
};
