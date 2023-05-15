import React from 'react';

import { IconButton, PlusIcon, useModal } from '@/components';
import { Protected, RoleActions } from '@/modules/roles';

import { CreateGuestModal } from '../create-guest/CreateGuestModal';
import { useGuestsStore } from '../../store/guests';
import { createGuestSchemaValidation } from '../../validation/guests.schema';

const CREATE_GUEST_MODAL = 'create_guest';

export const CreateGuest: React.FC = () => {
  const { open, close } = useModal();

  const addGuest = useGuestsStore((state) => state.addGuest);
  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const loading = useGuestsStore((state) => state.loading);

  const onClick = () => {
    open(CREATE_GUEST_MODAL);
  };

  const createGuest = async (values: any) => {
    await addGuest(values);
    close(CREATE_GUEST_MODAL);
    fetchGuests(/*force*/ true);
  };
  return (
    <Protected action={RoleActions.CREATE_GUEST}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreateGuestModal
        id={CREATE_GUEST_MODAL}
        onSubmit={createGuest}
        loading={loading}
        validation={createGuestSchemaValidation}
      />
    </Protected>
  );
};
