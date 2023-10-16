import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import {
  saveProfile,
  getProfileDetails,
  getProfileMainImage,
} from "../../profile/api/profile.api";

export type ProfileDetails = {
  country: string;
  currency: string;
  budget: number;
  guests: number;
  date: Date;
};

export interface ProfileStore {
  profile: ProfileDetails | null;
  loading: boolean;
  fetchProfileDetails: (force?: boolean) => Promise<void>;
  saveProfileDetails: (detailsData: ProfileDetails) => void;
  fethcProfileMainImage: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (set, get) => ({
        profile: null,
        loading: false,
        fetchProfileDetails: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProfile = get().profile;

          const hasCachedProfile = Boolean(cacheProfile);

          const profile =
            hasCachedProfile && !force
              ? cacheProfile
              : await getProfileDetails();

          set(() => ({
            profile,
            loading: false,
          }));
        },
        saveProfileDetails: async (values: any) => {
          try {
            set(() => ({ loading: true }));
            await saveProfile(values);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
        fethcProfileMainImage: async () => {
          try {
            set(() => ({ loading: true }));
            await getProfileMainImage();
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
      }),
      {
        name: "profile_details",
        partialize: (state) => ({
          profile: state.profile,
        }),
      }
    )
  )
);
