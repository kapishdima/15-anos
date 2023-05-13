import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createTask, getTasks, removeTask, updateTask, updateTaskStatus } from '../api/tasks.api';
import { Timestamp } from 'firebase/firestore';
import { devtools } from 'zustand/middleware';
import { getCompletedTasks } from './tasks.selectors';

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

export interface TasksStore {
  tasks: TaskViewModal[];
  tasksForView: TaskViewModal[];
  total: number;
  completed: number;
  loading: boolean;
  isRemoval: boolean;
  taskInProcessing: string;
  fetchTasks: (force?: boolean) => Promise<void>;
  toggleTaskRemoval: () => void;
  showCompleted: () => void;
  hideCompleted: () => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, payload: any) => void;
  addTask: (payload: any) => void;
  changeTaskStatus: (id: string, status: 'undone' | 'done') => void;
}

export const useTasksStore = create<TasksStore>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        tasksForView: [],
        completed: 0,
        total: 0,
        loading: false,
        isRemoval: false,
        taskInProcessing: '',
        fetchTasks: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedTasks = get().tasks;
          const cachedTasksForView = get().tasksForView;

          const hasCacheTasks = Boolean(cachedTasks && cachedTasks.length);
          const hasCachedTasksForView = Boolean(cachedTasksForView && cachedTasksForView.length);

          const tasks = hasCacheTasks && !force ? cachedTasks : await getTasks();

          const total = tasks.length;
          const completed = tasks.filter((task) => task.isCompleted).length;

          const tasksForView = hasCachedTasksForView && !force ? cachedTasksForView : tasks;
          const showCompleted = JSON.parse(
            new URLSearchParams(window.location.hash).get('showCompleted') || 'true',
          );

          set(() => ({
            tasks,
            tasksForView: showCompleted ? tasksForView : getCompletedTasks(tasksForView),
            loading: false,
            total,
            completed,
          }));
        },

        showCompleted: () => set((state) => ({ tasksForView: state.tasks })),
        hideCompleted: () => set((state) => ({ tasksForView: getCompletedTasks(state.tasks) })),
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
      }),
      {
        name: 'tasks',
        partialize: (state) => ({
          tasks: state.tasks,
          tasksForView: state.tasksForView,
        }),
      },
    ),
  ),
);
