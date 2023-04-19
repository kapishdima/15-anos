import React from 'react';
import { Card, useModal } from '@/components';
import { Guest } from '../../store/guests';

import ConfirmedIcon from '@image/icons/confirmed.svg';
import InvitedIcon from '@image/icons/invited.svg';
import WontComeIcon from '@image/icons/wont_come.svg';
import { GuestsStatus } from '../buttons/GuestStatus';
import { CreateGuestModal } from '../create-guest/CreateGuestModal';

type GuestCardProps = Guest & {};

const statusesIcons = {
  confirmed: ConfirmedIcon,
  invited: InvitedIcon,
  wont_come: WontComeIcon,
};

const statusColors = {
  confirmed: '#2ecc71',
  invited: '#f1c40f',
  wont_come: '#e74c3c',
};

export const GuestCard: React.FC<GuestCardProps> = ({ id, name, status, extra_guests, kinds }) => {
  const GUEST_MODAL_ID = `guest-modal-${id}`;

  const { open } = useModal();

  const onOpen = () => {
    open(GUEST_MODAL_ID);
  };

  const onDelete = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <Card
        id={id}
        title={name}
        icon={statusesIcons[status]}
        color={statusColors[status]}
        onOpen={onOpen}
        onDelete={onDelete}
        extra={<GuestsStatus />}
        hoverable={false}
      />
      <CreateGuestModal id={GUEST_MODAL_ID} initialValues={{ name, status, extra_guests, kinds }} />
    </>
  );
};
