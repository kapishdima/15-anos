import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  saveProfile,
  getProfileDetails,
  getProfileMainImage,
  uploadImageMain,
  getProfilePasswords,
  uploadEventTitle,
} from "../../profile/api/profile.api";
import { getEventTitle } from "@/modules/event";

export type ProfileDetails = {
  country: string;
  currency: string;
  budget: any;
  guests: any;
  date: Date;
  colors: ProfileColor[];
};

export type ProfileMainImage = {
  image: string;
};

export type ProfileColor = {
  title: string;
  color: string;
  id: string;
};

export type ProfilePasswords = {
  assistantPassword: string;
  ownerPassword: string;
  viewerPassword: string;
};

export interface ProfileStore {
  profile: ProfileDetails | null;
  eventTitle: string;
  profilePasswords: ProfilePasswords | null;
  mainImage: string;
  fetchLoading: boolean;
  uploadImageLoading: boolean;
  saveLoading: boolean;
  fetchProfileDetails: () => Promise<void>;
  fethcProfileMainImage: () => Promise<void>;
  fetchEventTitle: () => void;
  fetchPasswords: () => Promise<void>;
  saveProfileDetails: (detailsData: ProfileDetails) => void;
  saveImageMain: (file: File) => void;
  saveEventTitle: (eventTitle: string) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>()(
  devtools((set, get) => ({
    profile: null,
    profilePasswords: null,
    eventTitle: "",
    fetchLoading: false,
    uploadImageLoading: false,
    saveLoading: false,
    mainImage: "",
    fetchProfileDetails: async () => {
      set(() => ({
        fetchLoading: true,
      }));

      const profile = await getProfileDetails();

      set(() => ({
        profile,
        fetchLoading: false,
      }));
    },
    saveProfileDetails: async (values: any) => {
      try {
        set(() => ({ saveLoading: true }));
        const profile = get().profile;
        await saveProfile({ ...profile, ...values });
        set(() => ({ saveLoading: false }));
      } catch (error) {
        console.error(error);
        set(() => ({ saveLoading: false }));
      }
    },
    saveImageMain: async (file: File) => {
      try {
        set(() => ({ uploadImageLoading: true }));
        await uploadImageMain(file);
        set(() => ({ uploadImageLoading: false }));
      } catch (error) {
        console.error(error);
        set(() => ({ uploadImageLoading: false }));
      }
    },
    fethcProfileMainImage: async () => {
      try {
        set(() => ({ fetchLoading: true }));
        const mainImage = await getProfileMainImage();
        set(() => ({ fetchLoading: false, mainImage }));
      } catch (error) {
        console.error(error);
        set(() => ({ fetchLoading: false }));
      }
    },
    fetchEventTitle: () => {
      const eventTitle = getEventTitle();
      set(() => ({
        eventTitle,
      }));
    },
    fetchPasswords: async () => {
      set(() => ({
        fetchLoading: true,
      }));
      const passwords = await getProfilePasswords();
      set(() => ({
        fetchLoading: false,
        profilePasswords: passwords,
      }));
    },
    saveEventTitle: async (eventTitle: string) => {
      set(() => ({
        saveLoading: true,
      }));
      await uploadEventTitle(eventTitle);
      set(() => ({
        saveLoading: false,
      }));
    },
  }))
);
