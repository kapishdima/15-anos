import React from 'react';
import { TrashIcon } from '@components/icons';
import { CheckIcon, IconButton } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { useGuestsStore } from '../../store/guests';

export const RemoveGuest: React.FC = () => {
  const toggleGuestRemoval = useGuestsStore((state) => state.toggleGuestsRemoval);
  const removal = useGuestsStore((state) => state.isRemoval);

  return (
    <Protected action={RoleActions.DELETE_GUEST}>
      <IconButton appearance="filled" variant="white" onClick={toggleGuestRemoval}>
        {removal ? <CheckIcon /> : <TrashIcon />}
      </IconButton>
    </Protected>
  );
};
