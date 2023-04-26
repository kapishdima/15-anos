import React from 'react';
import { useTasksStore } from '../../store/tasks';
import { TaskList } from './TaskList';
import { sortedByCategoriesAlphabet, tasksVM } from '../../store/tasks.selectors';

export const TaskListByCategories: React.FC = () => {
  const tasks = useTasksStore(tasksVM);

  return <TaskList tasks={sortedByCategoriesAlphabet(tasks)} hasCardHint />;
};
