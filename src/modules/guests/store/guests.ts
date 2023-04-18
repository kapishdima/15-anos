import { create } from 'zustand';

export type GuestStatuses = 'invited' | 'wont_come' | 'confirmed';

export type Guest = {
  id: string;
  name: string;
  status: GuestStatuses;
  extra_guests: number;
  kinds: number;
};

interface GuestsStore {
  guests: Guest[];
  guestsForView: Guest[];
  total: number;
  confirmed: number;
  loading: boolean;
  isRemoval: boolean;
  fetchGuests: () => Promise<void>;
  toggleGuestsRemoval: () => void;
  showConfirmed: () => void;
  hideConfirmed: () => void;
  removeGuest: (id: string) => void;
}

const guests: Guest[] = [
  { id: '1', name: 'Test 1', status: 'invited', kinds: 0, extra_guests: 0 },
  { id: '2', name: 'Test 2', status: 'confirmed', kinds: 0, extra_guests: 0 },
  { id: '3', name: 'Test 3', status: 'wont_come', kinds: 0, extra_guests: 0 },
];

export const useGuestsStore = create<GuestsStore>((set) => ({
  guests: [],
  guestsForView: [],
  total: 0,
  confirmed: 0,
  loading: false,
  isRemoval: false,
  fetchGuests: async () => {
    set(() => ({
      loading: true,
    }));

    const total = guests.length;
    const confirmed = guests.filter((guest) => guest.status === 'confirmed').length;

    set(() => ({ guests: guests, guestsForView: guests, loading: false, total, confirmed }));
  },
  showConfirmed: () =>
    set((state) => {
      return { guestsForView: state.guests };
    }),
  hideConfirmed: () =>
    set((state) => {
      const unconfirmed = state.guests.filter((guest) => guest.status !== 'confirmed');

      return { guestsForView: unconfirmed };
    }),
  toggleGuestsRemoval: () =>
    set((state) => {
      return { isRemoval: !state.isRemoval };
    }),

  removeGuest: (id: string) =>
    set((state) => {
      return { guestsForView: state.guestsForView.filter((guest) => guest.id !== id) };
    }),
}));
