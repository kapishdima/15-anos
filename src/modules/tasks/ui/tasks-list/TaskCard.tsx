import React from 'react';

import { Card, useModal } from '@/components';
import { useTasksStore } from '@modules/tasks';

import { CreateTaskModal } from '../create-task/CreateTaskModal';
import isToday from 'date-fns/isToday';
import isPast from 'date-fns/isPast';

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
  hint?: string;
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
  hint,
  color = '#db5b78',
}) => {
  const updateTask = useTasksStore((state) => state.updateTask);
  const removeTask = useTasksStore((state) => state.removeTask);
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

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
    const status = completed ? 'undone' : 'done';
    await changeTaskStatus(id, status);
    fetchTasks(/*force*/ true);
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
        loading={loading && taskInProcessing === id}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={updateTaskStatus}
        hint={hint}
        expires={expires}
      />
      <CreateTaskModal
        id={TASK_MODAL_ID}
        initialValues={{ title, categoryId, date, notes }}
        onSubmit={updateTaskOnClick}
        loading={loading}
      />
    </>
  );
};
