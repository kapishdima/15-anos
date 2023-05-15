import React from 'react';
import { Card, useModal } from '@/components';
import { Guest, GuestStatuses, useGuestsStore } from '../../store/guests';

import ConfirmedIcon from '@image/icons/confirmed.svg';
import InvitedIcon from '@image/icons/invited.svg';
import WontComeIcon from '@image/icons/wont_come.svg';
import { GuestsStatus } from '../buttons/GuestStatus';
import { CreateGuestModal } from '../create-guest/CreateGuestModal';
import { createGuestSchemaValidation } from '../../validation/guests.schema';

type GuestCardProps = Guest & {};

const statusesIcons = {
  none: InvitedIcon,
  confirmed: ConfirmedIcon,
  confirmedGuest: ConfirmedIcon,
  invited: InvitedIcon,
  declined: WontComeIcon,
  declinedGuest: WontComeIcon,
};

const statusColors = {
  none: '#aeaba8',
  confirmed: '#2ecc71',
  confirmedGuest: '#2ecc71',
  invited: '#f1c40f',
  declined: '#e74c3c',
  declinedGuest: '#e74c3c',
};

export const GuestCard: React.FC<GuestCardProps> = ({
  id,
  name,
  status,
  guests,
  kids,
  nameGuest,
  guestsGuest,
  kidsGuest,
}) => {
  const GUEST_MODAL_ID = `guest-modal-${id}`;

  const guestsTitle = guests > 0 ? ` +${guests},` : '';
  const kidsTitle = kids > 0 ? ` +${kids} (kids)` : '';
  const cardTitle = name + guestsTitle + kidsTitle;

  const { open, close } = useModal();

  const removeGuest = useGuestsStore((state) => state.removeGuest);
  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const updateGuest = useGuestsStore((state) => state.updateGuest);
  const changeGuestStatus = useGuestsStore((state) => state.changeGuestStatus);

  const loading = useGuestsStore((state) => state.loading);

  const onOpen = () => {
    open(GUEST_MODAL_ID);
  };

  const onDelete = (id: string) => {
    removeGuest(id);
    fetchGuests(/*force*/ true);
  };

  const onUpdateGuest = async (values: any) => {
    console.log('onUpdateGuest', values);
    await updateGuest(id, values);
    close(GUEST_MODAL_ID);
    fetchGuests(/*force*/ true);
  };

  const onUpdateGuestStatus = async (status: string) => {
    await changeGuestStatus(id, status as GuestStatuses);
    fetchGuests(/*force*/ true);
  };

  return (
    <>
      <Card
        id={id}
        title={cardTitle}
        icon={statusesIcons[status]}
        color={statusColors[status]}
        onOpen={onOpen}
        onDelete={onDelete}
        extra={<GuestsStatus onSelect={onUpdateGuestStatus} />}
        hoverable={false}
        loading={loading}
      />
      <CreateGuestModal
        id={GUEST_MODAL_ID}
        initialValues={{ name, status, guests, kids, nameGuest, guestsGuest, kidsGuest }}
        onSubmit={onUpdateGuest}
        loading={loading}
        validation={createGuestSchemaValidation}
      />
    </>
  );
};
