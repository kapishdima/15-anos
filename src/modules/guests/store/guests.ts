import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  getGuests,
  updateGuest,
  updateGuestStatus,
  removeGuest,
  createGuest,
} from '../api/guests.api';
import { exceptConfirmedGuests } from './guests.selector';
import { UrlSearchParams } from '@/app/utils/location';

export type GuestStatuses =
  | 'none'
  | 'invited'
  | 'declined'
  | 'confirmed'
  | 'confirmedGuest'
  | 'declinedGuest';

export type Guest = {
  id: string;
  name: string;
  nameGuest: string;
  guests: number;
  guestsGuest: number;
  kids: number;
  kidsGuest: number;
  status: GuestStatuses;
};

export type GuestViewModal = {
  id: string;
  name: string;
  nameGuest: string;
  guests: number;
  guestsGuest: number;
  kids: number;
  kidsGuest: number;
  status: GuestStatuses;
};

export interface GuestsStore {
  guests: Guest[];
  guestsForView: Guest[];
  total: number;
  confirmed: number;
  loading: boolean;
  isRemoval: boolean;
  guestInProcessing: string;
  fetchGuests: (force?: boolean) => Promise<void>;
  toggleGuestsRemoval: () => void;
  showConfirmed: () => void;
  hideConfirmed: () => void;
  addGuest: (payload: any) => Promise<void>;
  updateGuest: (id: string, payload: any) => Promise<void>;
  changeGuestStatus: (id: string, status: GuestStatuses) => Promise<void>;
  removeGuest: (id: string) => Promise<void>;
  searchGuest: (query: string) => void;
}

export const useGuestsStore = create<GuestsStore>()(
  devtools(
    persist(
      (set, get) => ({
        guests: [],
        guestsForView: [],
        total: 0,
        confirmed: 0,
        loading: false,
        isRemoval: false,
        guestInProcessing: '',
        fetchGuests: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedGuests = get().guests;
          const cachedGuestsForView = get().guestsForView;

          const hasCacheGuests = Boolean(cachedGuests && cachedGuests.length);
          const hasCachedGuestsForView = Boolean(cachedGuestsForView && cachedGuestsForView.length);

          const guests = hasCacheGuests && !force ? cachedGuests : await getGuests();

          const total = guests.length;
          const confirmed = guests.filter((guest) => guest.status === 'confirmed').length;

          const guestsForView = hasCachedGuestsForView && !force ? cachedGuestsForView : guests;
          const showConfirmed = JSON.parse(
            new URLSearchParams(window.location.search).get('showCompleted') || 'true',
          );

          set(() => ({
            guests,
            guestsForView: showConfirmed ? guestsForView : exceptConfirmedGuests(guests),
            loading: false,
            total,
            confirmed,
          }));
        },
        showConfirmed: () =>
          set((state) => ({
            guestsForView: state.guests,
          })),
        hideConfirmed: () =>
          set((state) => ({ guestsForView: exceptConfirmedGuests(state.guests) })),
        toggleGuestsRemoval: () =>
          set((state) => {
            return { isRemoval: !state.isRemoval };
          }),

        removeGuest: async (id: string) => {
          try {
            set(() => ({ loading: true, guestInProcessing: id }));
            await removeGuest(id);

            set((state) => {
              return {
                guestsForView: state.guestsForView.filter((guest) => guest.id !== id),
                loading: false,
                guestInProcessing: '',
              };
            });
          } catch (error) {
            set(() => ({ loading: false, guestInProcessing: '' }));
          }
        },

        updateGuest: async (id: string, payload: any) => {
          try {
            set(() => ({ loading: true }));
            await updateGuest(id, payload);
            set(() => ({ loading: false }));
          } catch (error) {
            console.log(error);
            set(() => ({ loading: false }));
          }
        },

        changeGuestStatus: async (id: string, status: GuestStatuses) => {
          try {
            set(() => ({ loading: true, guestInProcessing: id }));
            await updateGuestStatus(id, status);
            set(() => ({ loading: false, guestInProcessing: '' }));
          } catch (error) {
            set(() => ({ loading: false, guestInProcessing: '' }));
          }
        },

        addGuest: async (payload: any) => {
          try {
            set(() => ({ loading: true }));
            await createGuest(payload);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
        searchGuest: (query: string) => {
          set((state) => {
            const showConfirmed = JSON.parse(
              new URLSearchParams(window.location.search).get('showCompleted') || 'true',
            );

            const guests =
              showConfirmed === undefined || showConfirmed === true
                ? state.guests
                : exceptConfirmedGuests(state.guests);

            return {
              guestsForView: guests.filter(
                (guest) =>
                  guest.name.toLowerCase().includes(query.toLowerCase()) ||
                  guest.nameGuest?.toLowerCase().includes(query.toLowerCase()),
              ),
            };
          });
        },
      }),
      {
        name: 'guests',
        partialize: (state) => ({
          guests: state.guests,
          guestsForView: state.guestsForView,
        }),
      },
    ),
  ),
);
