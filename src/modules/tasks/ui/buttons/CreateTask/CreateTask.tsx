import React from 'react';

import { PlusIcon } from '@components/icons';
import { IconButton, useModal } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { CreateTaskModal } from '../../create-task/CreateTaskModal';
import { useTasksStore } from '@/modules/tasks/store/tasks';
import { createTaskSchemaValidation } from '@/modules/tasks/validations/task.schema';

const CREATE_TASK_MODAL = 'create_task';

export const CreateTask: React.FC = () => {
  const { open, close } = useModal();

  const loading = useTasksStore((state) => state.loading);
  const addTask = useTasksStore((state) => state.addTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  const onClick = () => {
    open(CREATE_TASK_MODAL);
  };

  const createTask = async (values: any) => {
    await addTask(values);
    close(CREATE_TASK_MODAL);
    fetchTasks(/*force*/ true);
  };

  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreateTaskModal
        id={CREATE_TASK_MODAL}
        onSubmit={createTask}
        loading={loading}
        validation={createTaskSchemaValidation}
      />
    </Protected>
  );
};
