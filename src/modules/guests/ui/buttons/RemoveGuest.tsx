import React from 'react';
import { TrashIcon } from '@components/icons';
import { CheckIcon, IconButton } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { useGuestsStore } from '../../store/guests';

type RemoveGuestProps = {
  removal: boolean;
};

export const RemoveGuest: React.FC<RemoveGuestProps> = ({ removal }) => {
  const toggleGuestRemoval = useGuestsStore((state) => state.toggleGuestsRemoval);

  return (
    <Protected action={RoleActions.DELETE_GUEST}>
      <IconButton appearance="filled" variant="white" onClick={toggleGuestRemoval}>
        {removal ? <CheckIcon /> : <TrashIcon />}
      </IconButton>
    </Protected>
  );
};
