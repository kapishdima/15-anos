import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  pushData,
  deleteDocument,
  updateDocument,
  createDocumentWithAutoID,
  toDate,
} from "@/modules/firebase/firestore";

import {
  SearchedVendor,
  VendorContact,
  VendorContacts,
} from "../store/vendors.types";

import { getEventId } from "@/modules/event";
import { CloudFunctionsRoutes } from "@/app/constants/cloud-functions";
import { httpsCallable, getFunctions } from "firebase/functions";
import { getPosition } from "@/modules/map/api/map";
import { Timestamp, where } from "firebase/firestore";
import { Task } from "@/modules/tasks/store/tasks";

const toContacts = (vendor: SearchedVendor) => {
  const contactArray: VendorContact[] = Array.isArray(vendor.contacts)
    ? vendor.contacts
    : Object.values(vendor.contacts);

  const contactsWithRequiredFields = contactArray
    ?.filter((contact: VendorContact) =>
      Boolean(contact.contact && contact.contact.length)
    )
    .map((contact: VendorContact) => ({
      person: contact.person || "",
      type: contact.type || "",
      contact: contact.contact || "",
    }));

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

  return vendors.map((vendor) => {
    const contacts = vendor.contacts;
    const defaultContacts: VendorContacts = Array.isArray(contacts)
      ? contacts
      : Object.values(contacts);

    const contactsWithValues = defaultContacts.filter((c) =>
      Boolean(c.contact)
    );

    return {
      ...vendor,
      contacts: contactsWithValues,
    };
  });
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

export const sendVendorViewed = async (id: string): Promise<void> => {
  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_VENDOR_ACTION
  );

  await callPostAction({ vendorId: id, action: "view" });
};

export const deleteVendor = async (id: string): Promise<void> => {
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

  console.log("UPDATE", vendorPayload);

  return updateDocument(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_VENDORS, id],
    vendorPayload
  );
};

export const likeVendor = async (vendorId: string) => {
  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_VENDOR_ACTION
  );

  await callPostAction({ vendorId, action: "favourite" });
};

export const disslikeVendor = async (vendorId: string) => {
  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_VENDOR_ACTION
  );

  await callPostAction({ vendorId, action: "-favourite" });
};

export const addVendorAction = async (vendorId: string, action: string) => {
  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_VENDOR_ACTION
  );

  await callPostAction({ vendorId, action });
};

export const sendEmptyStatus = async (categoryId: string) => {
  const eventId = getEventId();
  const position = getPosition();

  const emptyRequest = {
    eventNumber: eventId,
    latitude: position.lat,
    longitude: position.lng,
    categoryId,
    date: Timestamp.fromDate(new Date()),
  };

  await createDocumentWithAutoID(Collections.EMPTY_VENDORS, [], emptyRequest);
};
