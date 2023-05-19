import { Collections } from '@app/constants/collections';
import { deleteDocument, getSnapshot, pushData, updateDocument } from '@modules/firebase/firestore';
import { getEventId } from '@/modules/event';

import { Guest, GuestStatuses, GuestViewModal } from '../store/guests';

export const getGuests = async (): Promise<GuestViewModal[]> => {
  const eventId = getEventId();
  const guests = await getSnapshot<Guest[]>(Collections.EVENTS, [eventId, Collections.GUESTS]);

  if (!guests) {
    return [];
  }

  return guests;
};

export const removeGuest = async (id: string) => {
  const eventId = getEventId();
  return deleteDocument(Collections.EVENTS, [eventId, Collections.GUESTS, id]);
};

export const updateGuest = async (id: string, payload: any) => {
  const eventId = getEventId();

  const updateGuestData = Object.keys(payload).reduce((acc: any, value: string) => {
    const payloadValue = payload[value];

    if (payloadValue) {
      acc[value] = payloadValue;
    }

    return acc;
  }, {});

  return updateDocument(Collections.EVENTS, [eventId, Collections.GUESTS, id], updateGuestData);
};

export const createGuest = async (payload: any) => {
  const eventId = getEventId();

  const guestData = {
    ...payload,
    guests: payload.guests || 0,
    kids: payload.kids || 0,
  };

  return pushData(Collections.EVENTS, [eventId, Collections.GUESTS, payload.name], guestData);
};

export const updateGuestStatus = async (id: string, status: GuestStatuses) => {
  const updatePaidStatusData = {
    status,
  };

  return await updateGuest(id, updatePaidStatusData);
};
