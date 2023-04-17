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
  const taskStore = useTasksStore();

  const onClick = () => {
    open(CREATE_TASK_MODAL);
  };

  const createTask = async (values: any) => {
    await taskStore.addTask(values);
    close(CREATE_TASK_MODAL);
    taskStore.fetchTasks();
  };

  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreateTaskModal
        id={CREATE_TASK_MODAL}
        onSubmit={createTask}
        loading={taskStore.loading}
        validation={createTaskSchemaValidation}
      />
    </Protected>
  );
};
