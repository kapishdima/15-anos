import { create } from 'zustand';
import { getTasks } from '../api/tasks.api';
import { EVENT_DETAILS } from '../../../app/constants/local-storage-keys';
import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';
import sortBy from 'lodash.sortby';
import { orderBy } from 'lodash';

export type Translations = { [key: string]: string };

export type Statuses = 'done' | 'undone';

export type Task = {
  categoryId: string;
  completed: Timestamp;
  date: Timestamp;
  notes: string;
  status: Statuses;
  suggestions: any[];
  title: Translations;
  vendorId: string;
};

export type TaskViewModal = {
  id: string;
  categoryId: string;
  completed: Date;
  date: Date;
  notes: string;
  isCompleted: boolean;
  suggestions: any[];
  title: Translations;
  vendorId: string;
};

export type GroupedTasks = { [key: string]: TaskViewModal[] };

interface TasksStore {
  tasks: TaskViewModal[];
  tasksForView: TaskViewModal[];
  total: number;
  completed: number;
  loading: boolean;
  isRemoval: boolean;
  fetchTasks: () => Promise<void>;
  toggleTaskRemoval: () => void;
  showCompleted: () => void;
  hideCompleted: () => void;
  removeTask: (id: string) => void;
}

export const groupByMonth = (tasks: TaskViewModal[]) => {
  const groupedTask = tasks.reduce((acc, task) => {
    const key = format(task.date, 'MMMM, yyyy');
    acc[key] = [...(acc[key] || []), task];

    return acc;
  }, {} as GroupedTasks);

  return groupedTask;
};

export const groupByDay = (tasks: TaskViewModal[]) => {
  const groupedTask = tasks.reduce((acc, task) => {
    const key = format(task.date, 'EEEE, dd MMMM yyyy');
    acc[key] = [...(acc[key] || []), task];

    return acc;
  }, {} as GroupedTasks);

  return groupedTask;
};

export const groupByCategory = (tasks: TaskViewModal[]) => {
  const groupedTask = tasks.reduce((acc, task) => {
    const key = task.categoryId;
    acc[key] = [...(acc[key] || []), task];

    return acc;
  }, {} as GroupedTasks);

  return groupedTask;
};

export const sortByDate = (tasks: TaskViewModal[]) => {
  const sortedByDate = orderBy(tasks, (task) => new Date(task.date), 'asc');

  return groupByMonth(sortedByDate);
};

export const sortByCategoriesAlphabet = (tasks: TaskViewModal[]) => {
  const sortedByAlphabet = sortBy(tasks, (task) => task.categoryId.toLowerCase());

  return groupByCategory(sortedByAlphabet);
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  tasksForView: [],
  completed: 0,
  total: 0,
  loading: false,
  isRemoval: false,
  fetchTasks: async () => {
    set(() => ({
      loading: true,
    }));
    const eventDetails = JSON.parse(window.localStorage.getItem(EVENT_DETAILS) || '{}');
    const event = `event${eventDetails.eventNumber}`;
    const tasks = (await getTasks(event)) || [];

    const total = tasks.length;
    const completed = tasks.filter((task) => task.isCompleted).length;

    set(() => ({ tasks, tasksForView: tasks, loading: false, total, completed }));
  },
  showCompleted: () =>
    set((state) => {
      return { tasksForView: state.tasks };
    }),
  hideCompleted: () =>
    set((state) => {
      const uncompleted = state.tasks.filter((task) => !task.isCompleted);

      return { tasksForView: uncompleted };
    }),
  toggleTaskRemoval: () =>
    set((state) => {
      return { isRemoval: !state.isRemoval };
    }),

  removeTask: (id: string) =>
    set((state) => {
      return { tasksForView: state.tasksForView.filter((task) => task.id !== id) };
    }),
}));
