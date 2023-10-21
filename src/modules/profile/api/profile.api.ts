import { Collections } from "@app/constants/collections";
import {
  getSnapshotDocument,
  pushData,
  toDate,
  updateDocument,
} from "@/modules/firebase/firestore";

import { getEventId, getEventNumber } from "@/modules/event";
import {
  ProfileDetails,
  ProfileMainImage,
  ProfilePasswords,
} from "../store/profile";
import { countries } from "@/app/data/countries";
import { currensies } from "@/app/data/currencies";
import { upload } from "@/modules/firebase/firestorage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { CloudFunctionsRoutes } from "@/app/constants/cloud-functions";
import { EVENT_DETAILS } from "@/app/constants/local-storage-keys";

export const getProfileDetails = async (): Promise<any> => {
  const eventId = getEventId();

  const profileDetails = await getSnapshotDocument<ProfileDetails>(
    Collections.EVENTS,
    [eventId, Collections.PROFILE]
  );

  return {
    ...profileDetails,
    budget: (profileDetails?.budget || "").toString(),
    guests: (profileDetails?.guests || "").toString(),
    date: new Date(toDate(profileDetails?.date)),
  };
};

export const uploadImageMain = async (file: File) => {
  const eventId = getEventId();

  const uploadedFile = await upload(Collections.IMAGES, "main.jpg", file);

  return pushData(Collections.EVENTS, [eventId, Collections.MAIN_IMAGE], {
    image: uploadedFile,
  });
};

export const saveProfile = async (
  profileData: ProfileDetails
): Promise<void> => {
  const eventId = getEventId();

  const country = countries.find(
    (country) => country.code === profileData.country
  );
  const currency = currensies.find(
    (currency) => currency.code === profileData.currency
  );

  const profilePayloadData = {
    ...profileData,
    guests: parseInt(profileData.guests || "0"),
    budget: parseInt(profileData.budget || "0"),
    country: country
      ? `${country?.code};${country?.emoji}:${country?.name}`
      : profileData.country,
    currency: currency
      ? `${currency?.code};${currency?.symbol}:${currency?.symbol_native}`
      : profileData.currency,
  };

  return updateDocument(
    Collections.EVENTS,
    [eventId, Collections.PROFILE],
    profilePayloadData
  );
};

export const getProfileMainImage = async () => {
  const eventId = getEventId();

  const mainImage = await getSnapshotDocument<ProfileMainImage>(
    Collections.EVENTS,
    [eventId, Collections.MAIN_IMAGE]
  );

  return mainImage?.image;
};

export const getProfilePasswords = async (): Promise<ProfilePasswords> => {
  const eventId = getEventNumber();

  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.GET_PROFILE_PASSWORD
  );

  const passwords = await callPostAction(eventId);
  return passwords.data as ProfilePasswords;
};

export const uploadEventTitle = async (eventTitle: string) => {
  const eventNumber = getEventNumber();

  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.SAVE_EVENT_TITLE
  );

  const response = await callPostAction({ eventTitle, eventNumber });

  if (!(response.data as any).error) {
    const eventDetails = JSON.parse(
      window.localStorage.getItem(EVENT_DETAILS) || "{}"
    );

    window.localStorage.setItem(
      EVENT_DETAILS,
      JSON.stringify({ ...eventDetails, eventTitle })
    );
  }
};
