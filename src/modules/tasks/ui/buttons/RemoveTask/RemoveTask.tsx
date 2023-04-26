import React from 'react';
import { TrashIcon } from '@components/icons';
import { CheckIcon, IconButton } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { useTasksStore } from '@/modules/tasks';

export const RemoveTask: React.FC = () => {
  const toggleTaskRemoval = useTasksStore((state) => state.toggleTaskRemoval);
  const removal = useTasksStore((state) => state.isRemoval);

  const onClick = () => {
    toggleTaskRemoval();
  };

  return (
    <Protected action={RoleActions.DELETE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        {removal ? <CheckIcon /> : <TrashIcon />}
      </IconButton>
    </Protected>
  );
};
