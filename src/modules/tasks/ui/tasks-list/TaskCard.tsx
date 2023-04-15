import React from 'react';

import { Card, useModal } from '@/components';
import { useTasksStore } from '@modules/tasks';

import { CreateTaskModal } from '../create-task/CreateTaskModal';

type TaskCardProps = {
  image: string;
  name: string;
  id: string;
  category: string;
  date: Date;
  notes: string;
  isRemoval?: boolean;
  color?: string;
  completed?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  name,
  image,
  completed,
  category,
  date,
  notes,
  isRemoval,
  color = '#db5b78',
}) => {
  const tasksStore = useTasksStore();
  const TASK_MODAL_ID = `task-modal-${id}`;

  const { open } = useModal();

  const onOpen = () => {
    open(TASK_MODAL_ID);
  };

  const onDelete = (id: string) => {
    tasksStore.removeTask(id);
  };

  return (
    <>
      <Card
        id={id}
        title={name}
        icon={image}
        color={color}
        completed={completed}
        removal={isRemoval}
        onOpen={onOpen}
        onDelete={onDelete}
      />
      <CreateTaskModal id={TASK_MODAL_ID} initialValues={{ name, category, date, notes }} />
    </>
  );
};
