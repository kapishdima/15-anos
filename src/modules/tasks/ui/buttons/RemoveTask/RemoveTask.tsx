import React from 'react';
import { TrashIcon } from '@components/icons';
import { CheckIcon, IconButton } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { useTasksStore } from '@/modules/tasks';

type RemoveTaskProps = {
  removal: boolean;
};

export const RemoveTask: React.FC<RemoveTaskProps> = ({ removal }) => {
  const tasksStore = useTasksStore();

  const onClick = () => {
    tasksStore.toggleTaskRemoval();
  };

  return (
    <Protected action={RoleActions.DELETE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        {removal ? <CheckIcon /> : <TrashIcon />}
      </IconButton>
    </Protected>
  );
};