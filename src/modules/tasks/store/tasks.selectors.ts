import format from 'date-fns/format';
import { GroupedTasks, TaskViewModal, TasksStore } from './tasks';

import sortBy from 'lodash.sortby';
import { orderBy } from 'lodash';

export const groupByMonth = (tasks: TaskViewModal[]) => {
  const groupedTask = tasks.reduce((acc, task) => {
    const key = format(task.date, 'MMMM, yyyy');
    acc[key] = [...(acc[key] || []), task];

    return acc;
  }, {} as GroupedTasks);

  return groupedTask;
};

export const groupByCategory = (tasks: TaskViewModal[]) => {
  return tasks.reduce((acc, task) => {
    const key = task.categoryId;
    acc[key] = [...(acc[key] || []), task];

    return acc;
  }, {} as GroupedTasks);
};

export const tasksVM = (state: TasksStore) => {
  console.log(state.tasksForView);
  return state.tasksForView.map((task) => {
    return {
      ...task,
      date: new Date(task.date),
    };
  });
};

export const sortedByDate = (tasks: TaskViewModal[]) => {
  const sorted = orderBy(tasks, (task) => new Date(task.date), 'asc');

  return groupByMonth(sorted);
};

export const sortedByCategoriesAlphabet = (tasks: TaskViewModal[]): GroupedTasks => {
  const sorted = sortBy(tasks, (task) => task.categoryId.toLowerCase());

  return groupByCategory(sorted);
};

export const groupedByDate = (tasks: TaskViewModal[]) => {
  return tasks.reduce((acc, task) => {
    const key = format(task.date, 'EEEE, dd MMMM yyyy');
    acc[key] = [...(acc[key] || []), task];

    return acc;
  }, {} as GroupedTasks);
};
