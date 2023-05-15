import sortBy from 'lodash.sortby';
import { GuestViewModal, GuestsStore } from './guests';

export const sortedByNameAlphabet = (state: GuestsStore): GuestViewModal[] => {
  const sorted = sortBy(state.guestsForView, (guest) => guest.name.toLowerCase());

  return sorted;
};

export const exceptConfirmedGuests = (guests: GuestViewModal[]) => {
  return guests.filter(
    (guest) => guest.status !== 'confirmed' && guest.status !== 'confirmedGuest',
  );
};

export const amountGuests = (state: GuestsStore) => {
  const guestGuest = state.guestsForView.reduce((acc, value: any) => {
    acc += parseInt(value.guestsGuest) || parseInt(value.guests);

    return acc;
  }, 0);

  return state.guestsForView.length + guestGuest;
};

export const amountConfirmedGuestsWithExtraGuests = (state: GuestsStore) => {
  const confirmedGuests = state.guestsForView.filter(
    (guest) => guest.status === 'confirmed' || guest.status === 'confirmedGuest',
  );

  const guestGuest = confirmedGuests.reduce((acc, value: any) => {
    acc += parseInt(value.guestsGuest) || parseInt(value.guests);

    return acc;
  }, 0);

  return confirmedGuests.length + guestGuest;
};

export const amountInvitedGuests = (state: GuestsStore) => {
  const confirmedGuests = state.guestsForView.filter((guest) => guest.status === 'invited');

  const guestGuest = confirmedGuests.reduce((acc, value: any) => {
    acc += parseInt(value.guestsGuest) || parseInt(value.guests);

    return acc;
  }, 0);

  return confirmedGuests.length + guestGuest;
};

export const amountDeclinedGuests = (state: GuestsStore) => {
  const confirmedGuests = state.guestsForView.filter(
    (guest) => guest.status === 'declined' || guest.status === 'declinedGuest',
  );

  const guestGuest = confirmedGuests.reduce((acc, value: any) => {
    acc += parseInt(value.guestsGuest) || parseInt(value.guests);

    return acc;
  }, 0);

  return confirmedGuests.length + guestGuest;
};

export const amountConfirmedGuests = (state: GuestsStore) => {
  const confirmedGuests = state.guestsForView.filter(
    (guest) => guest.status === 'confirmed' || guest.status === 'confirmedGuest',
  );

  return confirmedGuests.length;
};

export const amountKidsGuest = (state: GuestsStore) => {
  const confirmedGuests = state.guestsForView.filter(
    (guest) => guest.status === 'confirmed' || guest.status === 'confirmedGuest',
  );

  const kidsGuest = confirmedGuests.reduce((acc, value: any) => {
    acc += parseInt(value.kidsGuest) || parseInt(value.kids);

    return acc;
  }, 0);

  return kidsGuest;
};
