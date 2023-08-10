import React from "react";

import isToday from "date-fns/isToday";
import isPast from "date-fns/isPast";

import { Card, useModal } from "@/components";
import { useTasksStore } from "@modules/tasks";
import { getCategoryImage } from "@/app/utils/category-icon";

import { CreateTaskModal } from "../create-task/CreateTaskModal";
import { CreateTaskActions } from "../buttons/CreateTaskActions/CreateTaskActions";
import { Translated } from "@/app/utils/locale";

type TaskCardProps = {
  title: Translated;
  id: string;
  categoryId: string;
  date: Date;
  notes: string;
  isRemoval?: boolean;
  color?: string;
  completed?: boolean;
  hint?: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  completed,
  date,
  notes,
  isRemoval,
  hint,
  categoryId = "",
  color = "#db5b78",
}) => {
  const updateTask = useTasksStore((state) => state.updateTask);
  const removeTask = useTasksStore((state) => state.removeTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);

  const loading = useTasksStore((state) => state.loading);
  const taskInProcessing = useTasksStore((state) => state.taskInProcessing);

  const isDayPassed = !isToday(new Date(date)) && isPast(new Date(date));
  const expires = isDayPassed && !completed;

  const TASK_MODAL_ID = `task-modal-${id}`;

  const { open, close } = useModal();

  const onOpen = () => {
    open(TASK_MODAL_ID);
  };

  const onDelete = (id: string) => {
    removeTask(id);
    fetchTasks(/*force*/ true);
  };

  const updateTaskOnClick = async (values: any) => {
    await updateTask(id, values);
    close(TASK_MODAL_ID);
    fetchTasks(/*force*/ true);
  };

  const updateTaskStatus = async (id: string) => {
    const status = completed ? "undone" : "done";
    await changeTaskStatus(id, status);
    close(TASK_MODAL_ID);
    fetchTasks(/*force*/ true);
  };

  return (
    <>
      <Card
        id={id}
        title={title}
        icon={getCategoryImage(categoryId as any)}
        color={color}
        completed={completed}
        removal={isRemoval}
        loading={loading && taskInProcessing === id}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={updateTaskStatus}
        hint={hint}
        expires={expires}
      />
      <CreateTaskModal
        id={TASK_MODAL_ID}
        taskId={id}
        initialValues={{ title, categoryId, date, notes }}
        onSubmit={updateTaskOnClick}
        loading={loading}
        hasDeleteButton
        hasConfirmButton={false}
        actions={
          <CreateTaskActions
            modalId={TASK_MODAL_ID}
            updateTaskStatus={() => updateTaskStatus(id)}
            isCompleted={Boolean(completed)}
          />
        }
      />
    </>
  );
};
