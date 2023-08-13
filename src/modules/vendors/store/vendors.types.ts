import { Translated } from "@/app/utils/locale";

export type SearchedVendor = {
  id: string;
  categoryId: string;
  contacts: VendorContacts;
  description: Translated;
  image: string;
  latitude: number;
  longitude: number;
  title: Translated;
};

export type VendorContacts = VendorContact[];

export type VendorContact = {
  type: VendorContactsTypes;
  contact: string;
  person?: string;
};

export type VendorContactsTypes =
  | "phone"
  | "mail"
  | "address"
  | "facebook"
  | "instagram";

export type Category = {
  id: string;
  categoryId: string;
  image: string;
  number: number;
  title: Translated;
};
