import React from "react";
import { useNavigate } from "react-router-dom";

import isToday from "date-fns/isToday";
import isPast from "date-fns/isPast";

import { Card } from "@/components";
import { AppRoutes } from "@/app/router/routes";

import { useTasksStore } from "@modules/tasks";
import { getCategoryImage } from "@/app/utils/category-icon";
import { TaskViewModal } from "../../store/tasks";
import { RoleActions } from "@/modules/roles";

type TaskCardProps = {
  task: TaskViewModal;
  categoryId: string;
  isRemoval?: boolean;
  color?: string;
  hint?: string;
  onUpdateStatusSuccess?: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isRemoval,
  hint,
  onUpdateStatusSuccess,
  categoryId = "",
  color = "#db5b78",
}) => {
  const { id, date, title, isCompleted } = task;
  const navigate = useNavigate();
  const removeTask = useTasksStore((state) => state.removeTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const setCurrentTask = useTasksStore((state) => state.setCurrentTask);

  const loading = useTasksStore((state) => state.loading);
  const taskInProcessing = useTasksStore((state) => state.taskInProcessing);

  const isDayPassed = !isToday(new Date(date)) && isPast(new Date(date));
  const expires = isDayPassed && !isCompleted;

  const onOpen = () => {
    setCurrentTask(task);
    navigate(AppRoutes.UPDATE_TASK);
  };

  const onDelete = (id: string) => {
    removeTask(id);
    fetchTasks(/*force*/ true);
  };

  const updateTaskStatus = async (id: string) => {
    const status = isCompleted ? "undone" : "done";
    await changeTaskStatus(id, status);
    fetchTasks(/*force*/ true);
    if (onUpdateStatusSuccess) {
      onUpdateStatusSuccess();
    }
  };

  return (
    <>
      <Card
        id={id}
        title={title}
        icon={getCategoryImage(categoryId as any)}
        color={color}
        completed={isCompleted}
        removal={isRemoval}
        loading={loading && taskInProcessing === id}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={updateTaskStatus}
        hint={hint}
        expires={expires}
        action={[RoleActions.EDIT_TASK, RoleActions.MARK_TASK]}
      />
    </>
  );
};
