import { Collections } from '@app/constants/collections';
import {
  getSnapshotCollection,
  getSnapshotDocument,
  pushData,
  deleteDocument,
} from '@modules/firebase/firestore';

import { getEventId } from '@/modules/event';
import { ProfileDetails } from '../store/profile';
import { countries } from '@/app/data/countries';
import { currensies } from '@/app/data/currencies';

export const getProfileDetails = async (): Promise<any> => {
  const eventId = getEventId();

  const profileDetails = await getSnapshotDocument<ProfileDetails>(Collections.EVENTS, [
    eventId,
    Collections.REGION_DETAILS,
  ]);

  return profileDetails;
};

export const saveProfile = async (profileData: ProfileDetails): Promise<void> => {
  const eventId = getEventId();

  const country = countries.find((country) => country.code === profileData.country);
  const currency = currensies.find((currency) => currency.code === profileData.currency);

  const profilePayloadData = {
    country: `${country?.code};${country?.emoji}:${country?.name}`,
    currency: `${currency?.code};${currency?.name_plural}:${currency?.symbol}`,
  };

  return pushData(Collections.EVENTS, [eventId, Collections.REGION_DETAILS], profilePayloadData);
};
