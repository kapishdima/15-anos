import React, { useState } from "react";

import { SelectField } from "@/components";

import { useFormContext } from "react-hook-form";
import {
  VendorContact,
  VendorContactsTypes,
} from "../../../store/vendors.types";
import { Phone } from "./types/Phone";
import { Address } from "./types/Address";
import { Email } from "./types/Email";
import { Instagram } from "./types/Instagram";
import { Facebook } from "./types/Facebook";
import { Website } from "./types/Website";

import { Option } from "@/components/select/Select";

import AddressIcon from "@/image/icons/address.svg";
import EmailIcon from "@/image/icons/mail.svg";
import FacebookIcon from "@/image/icons/facebook.svg";
import InstagramIcon from "@/image/icons/instagram.svg";
import PhoneIcon from "@/image/icons/phone.svg";
import WebsiteIcon from "@/image/icons/website.svg";

const contactsComponents = {
  phone: Phone,
  mail: Email,
  address: Address,
  facebook: Facebook,
  instagram: Instagram,
  website: Website,
};

const contactsOptions: Option[] = [
  { value: "phone", label: "Phone number", icon: <img src={PhoneIcon} /> },
  { value: "mail", label: "Email", icon: <img src={EmailIcon} /> },
  { value: "address", label: "Address", icon: <img src={AddressIcon} /> },
  { value: "facebook", label: "Facebook", icon: <img src={FacebookIcon} /> },
  { value: "instagram", label: "Instagram", icon: <img src={InstagramIcon} /> },
  { value: "website", label: "Website", icon: <img src={WebsiteIcon} /> },
];

export const ContactsCreator: React.FC = () => {
  const { getValues } = useFormContext();
  const contacts: VendorContact[] = Array.isArray(getValues("contacts"))
    ? getValues("contacts")
    : [];

  const [selectedContacts, setSelectedContacts] = useState<
    VendorContactsTypes[]
  >(contacts?.map((c) => c.type || "phone") || []);

  const onContactSelect = (contact: any) => {
    setSelectedContacts((_contacts) => [..._contacts, contact]);
  };

  const onDelete = (contact: any) => {
    setSelectedContacts((_contacts) => _contacts.filter((c) => c !== contact));
  };

  return (
    <>
      <div className="contacts-list">
        {selectedContacts.map((contact, index) => {
          const SelectedContact = contactsComponents[contact];

          if (!SelectedContact) {
            return null;
          }

          // @ts-ignore
          return <SelectedContact index={index} onDelete={onDelete} />;
        })}
      </div>
      <SelectField
        options={contactsOptions || []}
        onSelect={onContactSelect}
        placeholder="Add a contact"
        name={""}
        label="Select contact type"
        variant="filled"
      />
    </>
  );
};
