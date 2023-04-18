import React from 'react';

import { IconButton, PlusIcon, useModal } from '@/components';
import { Protected, RoleActions } from '@/modules/roles';

import { CreateGuestModal } from '../create-guest/CreateGuestModal';

const CREATE_GUEST_MODAL = 'create_guest';

export const CreateGuest: React.FC = () => {
  const { open } = useModal();

  const onClick = () => {
    open(CREATE_GUEST_MODAL);
  };
  return (
    <Protected action={RoleActions.CREATE_GUEST}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreateGuestModal id={CREATE_GUEST_MODAL} />
    </Protected>
  );
};
