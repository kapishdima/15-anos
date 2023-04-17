import { create } from 'zustand';
import { createTask, getTasks, removeTask, updateTask, updateTaskStatus } from '../api/tasks.api';
import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';
import sortBy from 'lodash.sortby';
import { orderBy } from 'lodash';

export type Translations = { [key: string]: string };

export type Statuses = 'done' | 'undone';

export type Task = {
  id: string;
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
  taskInProcessing: string;
  fetchTasks: () => Promise<void>;
  toggleTaskRemoval: () => void;
  showCompleted: () => void;
  hideCompleted: () => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, payload: any) => void;
  addTask: (payload: any) => void;
  changeTaskStatus: (id: string, status: 'undone' | 'done') => void;
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
  taskInProcessing: '',
  fetchTasks: async () => {
    set(() => ({
      loading: true,
    }));
    const tasks = (await getTasks()) || [];
    console.log(tasks);

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

  removeTask: async (id: string) => {
    try {
      set(() => ({ loading: true, taskInProcessing: id }));
      await removeTask(id);

      set((state) => {
        return {
          tasksForView: state.tasksForView.filter((task) => task.id !== id),
          loading: false,
          taskInProcessing: '',
        };
      });
    } catch (error) {
      set(() => ({ loading: false, taskInProcessing: '' }));
    }
  },

  updateTask: async (id: string, payload: any) => {
    try {
      set(() => ({ loading: true }));
      await updateTask(id, payload);
      set(() => ({ loading: false }));
    } catch (error) {
      set(() => ({ loading: false }));
    }
  },

  changeTaskStatus: async (id: string, status: 'undone' | 'done') => {
    try {
      set(() => ({ loading: true, taskInProcessing: id }));
      await updateTaskStatus(id, status);
      set(() => ({ loading: false, taskInProcessing: '' }));
    } catch (error) {
      set(() => ({ loading: false, taskInProcessing: '' }));
    }
  },

  addTask: async (payload: any) => {
    try {
      set(() => ({ loading: true }));
      await createTask(payload);
      set(() => ({ loading: false }));
    } catch (error) {
      console.error(error);
      set(() => ({ loading: false }));
    }
  },
}));
