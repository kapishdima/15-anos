import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  getSnapshotDocument,
  pushData,
  toDate,
  deleteDocument,
  updateDocument,
} from "@/modules/firebase/firestore";

import {
  SearchedVendor,
  VendorContact,
  VendorContacts,
} from "../store/vendors.types";

import { getEventId } from "@/modules/event";
import { CloudFunctionsRoutes } from "@/app/constants/cloud-functions";
import { httpsCallable, getFunctions } from "firebase/functions";

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
      type: contact.person || "",
      contact: contact.person || "",
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

  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_VENDOR_ACTION
  );

  const contacts = toContacts(vendorData);

  const vendorPayload = {
    ...vendorData,
    contacts: contacts || [],
  };

  await Promise.all([
    await callPostAction({ vendorId: vendorData.id, action: "favourite" }),
    await pushData(
      Collections.EVENTS,
      [eventId, Collections.MANUAL_VENDORS, vendorData.id || vendorData.title],
      vendorPayload
    ),
  ]);

  return;
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

  const callPostAction = httpsCallable(
    getFunctions(),
    CloudFunctionsRoutes.ADD_VENDOR_ACTION
  );

  await Promise.all([
    await callPostAction({ vendorId: id, action: "-favourite" }),

    await deleteDocument(Collections.EVENTS, [
      eventId,
      Collections.MANUAL_VENDORS,
      id,
    ]),
  ]);

  return;
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
