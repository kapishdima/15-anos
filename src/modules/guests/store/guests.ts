import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import {
  getGuests,
  updateGuest,
  updateGuestStatus,
  removeGuest,
  createGuest,
} from "../api/guests.api";
import { exceptConfirmedGuests, filterGuestsByName } from "./guests.selector";

export type GuestStatuses =
  | "none"
  | "invited"
  | "declined"
  | "confirmed"
  | "confirmedGuest"
  | "declinedGuest";

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
  currentGuest: Guest | null;
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
  setCurrentGuest: (guest: Guest) => void;
  clearCurrentGuest: () => void;
}

export const useGuestsStore = create<GuestsStore>()(
  devtools((set, get) => ({
    currentGuest: null,
    guests: [],
    guestsForView: [],
    total: 0,
    confirmed: 0,
    loading: false,
    isRemoval: false,
    guestInProcessing: "",
    fetchGuests: async (force?: boolean) => {
      set(() => ({
        loading: true,
      }));

      const guests = await getGuests();
      const total = guests.length;
      const confirmed = guests.filter(
        (guest) => guest.status === "confirmed"
      ).length;

      const guestsForView = guests;
      const showConfirmed = JSON.parse(
        new URLSearchParams(window.location.search).get("showCompleted") ||
          "true"
      );

      set(() => ({
        guests,
        guestsForView: showConfirmed
          ? guestsForView
          : exceptConfirmedGuests(guests),
        loading: false,
        total,
        confirmed,
      }));
    },
    showConfirmed: () =>
      set((state) => {
        const querySearch = new URLSearchParams(window.location.search);
        const query = querySearch.get("q");

        if (!query) {
          return {
            guestsForView: state.guests,
          };
        }

        const guests = filterGuestsByName(state.guests, query);

        return {
          guestsForView: guests,
        };
      }),
    hideConfirmed: () =>
      set((state) => {
        const querySearch = new URLSearchParams(window.location.search);
        const query = querySearch.get("q");

        if (!query) {
          return {
            guestsForView: exceptConfirmedGuests(state.guests),
          };
        }

        const guests = filterGuestsByName(state.guests, query);

        return { guestsForView: exceptConfirmedGuests(guests) };
      }),
    toggleGuestsRemoval: () =>
      set((state) => {
        return { isRemoval: !state.isRemoval };
      }),

    removeGuest: async (id: string) => {
      try {
        set(() => ({ loading: true, guestInProcessing: id }));
        await removeGuest(id, get().guests);

        set((state) => {
          return {
            guestsForView: state.guestsForView.filter(
              (guest) => guest.id !== id
            ),
            loading: false,
            guestInProcessing: "",
          };
        });
      } catch (error) {
        set(() => ({ loading: false, guestInProcessing: "" }));
      }
    },

    updateGuest: async (id: string, payload: any) => {
      try {
        set(() => ({ loading: true }));
        await updateGuest(id, get().guests, payload);
        set(() => ({ loading: false }));
      } catch (error) {
        console.log(error);
        set(() => ({ loading: false }));
      }
    },

    changeGuestStatus: async (id: string, status: GuestStatuses) => {
      try {
        set(() => ({ loading: true, guestInProcessing: id }));
        await updateGuestStatus(id, get().guests, status);
        set(() => ({ loading: false, guestInProcessing: "" }));
      } catch (error) {
        set(() => ({ loading: false, guestInProcessing: "" }));
      }
    },

    addGuest: async (payload: any) => {
      try {
        set(() => ({ loading: true }));
        await createGuest(get().guests, payload);
        set(() => ({ loading: false }));
      } catch (error) {
        console.error(error);
        set(() => ({ loading: false }));
      }
    },
    searchGuest: (query: string) => {
      set((state) => {
        const querySearch = new URLSearchParams(window.location.search);
        const showConfirmed = JSON.parse(
          querySearch.get("showCompleted") || "true"
        );

        const guests =
          showConfirmed === undefined || showConfirmed === true
            ? state.guests
            : exceptConfirmedGuests(state.guests);

        return {
          guestsForView: filterGuestsByName(guests, query),
        };
      });
    },
    setCurrentGuest: (guest: Guest) => {
      set(() => {
        return {
          currentGuest: guest,
        };
      });
    },
    clearCurrentGuest: () => {
      set(() => {
        return {
          currentGuest: null,
        };
      });
    },
  }))
);
