import React, { useState } from 'react';

import { Card, useModal } from '@/components';
import { useTasksStore } from '@modules/tasks';

import { CreateTaskModal } from '../create-task/CreateTaskModal';

type TaskCardProps = {
  image: string;
  title: string;
  id: string;
  categoryId: string;
  date: Date;
  notes: string;
  isRemoval?: boolean;
  color?: string;
  completed?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  image,
  completed,
  categoryId,
  date,
  notes,
  isRemoval,
  color = '#db5b78',
}) => {
  const tasksStore = useTasksStore();
  const TASK_MODAL_ID = `task-modal-${id}`;

  const { open, close } = useModal();

  const onOpen = () => {
    open(TASK_MODAL_ID);
  };

  const onDelete = (id: string) => {
    tasksStore.removeTask(id);
  };

  const updateTask = async (values: any) => {
    await tasksStore.updateTask(id, values);
    close(TASK_MODAL_ID);
    tasksStore.fetchTasks();
  };

  const updateTaskStatus = async (id: string) => {
    const status = completed ? 'undone' : 'done';
    await tasksStore.changeTaskStatus(id, status);
    tasksStore.fetchTasks();
  };

  return (
    <>
      <Card
        id={id}
        title={title}
        icon={image}
        color={color}
        completed={completed}
        removal={isRemoval}
        loading={tasksStore.loading && tasksStore.taskInProcessing === id}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={updateTaskStatus}
      />
      <CreateTaskModal
        id={TASK_MODAL_ID}
        initialValues={{ title, categoryId, date, notes }}
        onSubmit={updateTask}
        loading={tasksStore.loading}
      />
    </>
  );
};
