import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  getSnapshotDocument,
  pushData,
  toDate,
  deleteDocument,
  updateDocument,
} from "@/modules/firebase/firestore";

import { SearchedVendor, VendorContact } from "../store/vendors.types";

import { getEventId } from "@/modules/event";

const toContacts = (vendor: SearchedVendor) => {
  const contactArray: VendorContact[] = Array.isArray(vendor.contacts)
    ? vendor.contacts
    : Object.values(vendor.contacts);

  const contactsWithRequiredFields = contactArray?.map(
    (contact: VendorContact) => ({
      person: contact.person || "",
      type: contact.person || "",
      contact: contact.person || "",
    })
  );

  return contactsWithRequiredFields;
};

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

  const contacts = toContacts(vendorData);

  const vendorPayload = {
    ...vendorData,
    contacts: contacts || [],
  };

  return pushData(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_VENDORS, vendorData.id || vendorData.title],
    vendorPayload
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

export const updateVendor = (
  id: string,
  vendor: SearchedVendor
): Promise<void> => {
  const eventId = getEventId();

  const contacts = toContacts(vendor);

  const vendorPayload = {
    ...vendor,
    contacts: contacts || [],
  };

  return updateDocument(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_VENDORS, id],
    vendorPayload
  );
};
