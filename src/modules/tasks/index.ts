import { CreateTask } from './ui/buttons/CreateTask/CreateTask';
import { RemoveTask } from './ui/buttons/RemoveTask/RemoveTask';
import { ToggleVisibilityCompleted } from './ui/buttons/ToggleVisibility/ToggleVisibilityCompleted';

import { TaskListByCategories } from './ui/tasks-list/TaskListByCategories';
import { TaskListByDate } from './ui/tasks-list/TaskListByDate';

import { TaskProgress } from './ui/tasks-progress/TaskProgress';

import { useTasksStore } from './store/tasks';

export {
  CreateTask,
  RemoveTask,
  ToggleVisibilityCompleted,
  TaskListByCategories,
  TaskListByDate,
  TaskProgress,
  useTasksStore,
};
