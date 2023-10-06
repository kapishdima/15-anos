import { CreateTask } from "./ui/buttons/CreateTask/CreateTask";
import { RemoveTask } from "./ui/buttons/RemoveTask/RemoveTask";
import { ToggleVisibilityCompleted } from "./ui/buttons/ToggleVisibility/ToggleVisibilityCompleted";

import { TaskListByCategories } from "./ui/tasks-list/TaskListByCategories";
import { TaskListByDate } from "./ui/tasks-list/TaskListByDate";
import { TaskCard } from "./ui/tasks-list/TaskCard";

import { TaskProgress } from "./ui/tasks-progress/TaskProgress";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { UpdateTaskPage } from "./pages/UpdateTaskPage";
import { TasksListPage } from "./pages/TasksListPage";

import { useTasksStore } from "./store/tasks";

export {
  CreateTask,
  RemoveTask,
  ToggleVisibilityCompleted,
  TaskListByCategories,
  TaskListByDate,
  TaskProgress,
  useTasksStore,
  UpdateTaskPage,
  CreateTaskPage,
  TasksListPage,
  TaskCard,
};
