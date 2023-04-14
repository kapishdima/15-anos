import React from 'react';
import { TrashIcon } from '@components/icons';
import { IconButton } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { useTasksStore } from '@/modules/tasks';

export const RemoveTask: React.FC = () => {
  const tasksStore = useTasksStore();

  const onClick = () => {
    tasksStore.toggleTaskRemoval();
  };

  return (
    <Protected action={RoleActions.DELETE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <TrashIcon />
      </IconButton>
    </Protected>
  );
};
