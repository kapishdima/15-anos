import { Collections } from "@app/constants/collections";
import {
  getSnapshotDocument,
  updateDocument,
} from "@/modules/firebase/firestore";

import { getEventId } from "@/modules/event";
import { ProfileDetails } from "../store/profile";
import { countries } from "@/app/data/countries";
import { currensies } from "@/app/data/currencies";

export const getProfileDetails = async (): Promise<any> => {
  const eventId = getEventId();

  const profileDetails = await getSnapshotDocument<ProfileDetails>(
    Collections.EVENTS,
    [eventId, Collections.PROFILE]
  );

  return {
    ...profileDetails,
    budget: (profileDetails?.budget || "").toString(),
  };
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
    country: country
      ? `${country?.code};${country?.emoji}:${country?.name}`
      : profileData.country,
    currency: currency
      ? `${currency?.code};${currency?.name_plural}:${currency?.symbol_native}`
      : profileData.currency,
  };

  return updateDocument(
    Collections.EVENTS,
    [eventId, Collections.PROFILE],
    profilePayloadData
  );
};
