import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  getSnapshotDocument,
  pushData,
  toDate,
  deleteDocument,
} from "@modules/firebase/firestore";

import { SearchedVendor } from "../store/vendors.types";

import { getEventId } from "@/modules/event";

export const getManualVendors = async (): Promise<SearchedVendor[]> => {
  const eventId = getEventId();
  const vendors = await getSnapshotCollection<SearchedVendor[]>(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_VENDORS]
  );

  if (!vendors) {
    return [];
  }

  return vendors;
};

export const addManualVendor = async (vendorData: any): Promise<void> => {
  const eventId = getEventId();

  console.log(vendorData);
  return pushData(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_VENDORS, vendorData.id],
    vendorData
  );
};

export const deleteVendor = (id: string): Promise<void> => {
  const eventId = getEventId();

  return deleteDocument(Collections.EVENTS, [
    eventId,
    Collections.MANUAL_VENDORS,
    id,
  ]);
};
