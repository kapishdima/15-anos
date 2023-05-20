import { Collections } from '@app/constants/collections';
import {
  deleteDocument,
  getSnapshotDocument,
  pushData,
  updateDocument,
} from '@modules/firebase/firestore';
import { getEventId } from '@/modules/event';

import { Guest, GuestStatuses, GuestViewModal } from '../store/guests';

type GuestsResponse = {
  id: string;
  list: Guest[];
};

export const getGuests = async (): Promise<GuestViewModal[]> => {
  const eventId = getEventId();
  const guestsList = await getSnapshotDocument<GuestsResponse>(Collections.EVENTS, [
    eventId,
    Collections.GUESTS,
    Collections.LIST,
  ]);

  if (!guestsList) {
    return [];
  }

  return guestsList.list.map((guest) => ({ ...guest, id: guest.name }));
};

export const removeGuest = async (id: string, guests: Guest[]) => {
  const eventId = getEventId();

  const updatedGuests = guests.filter((guest) => guest.id !== id);

  return updateDocument(Collections.EVENTS, [eventId, Collections.GUESTS, Collections.LIST], {
    list: updatedGuests,
  });
};

export const updateGuest = async (id: string, guests: Guest[], payload: any) => {
  const eventId = getEventId();

  const updateGuestData = Object.keys(payload).reduce((acc: any, value: string) => {
    const payloadValue = payload[value];

    if (payloadValue) {
      acc[value] = payloadValue;
    }

    return acc;
  }, {});

  console.log(id);

  const updatedGuests = guests.map((guest) => {
    if (guest.id === id) {
      return {
        ...guest,
        ...updateGuestData,
      };
    }

    return guest;
  });

  return updateDocument(Collections.EVENTS, [eventId, Collections.GUESTS, Collections.LIST], {
    list: updatedGuests,
  });
};

export const createGuest = async (guests: Guest[], payload: any) => {
  const eventId = getEventId();

  const newGuest = {
    ...payload,
    guests: payload.guests || 0,
    kids: payload.kids || 0,
  };

  return pushData(Collections.EVENTS, [eventId, Collections.GUESTS, Collections.LIST], {
    list: [...guests, newGuest],
  });
};

export const updateGuestStatus = async (id: string, guests: Guest[], status: GuestStatuses) => {
  const updatePaidStatusData = {
    status,
  };

  return await updateGuest(id, guests, updatePaidStatusData);
};
