import React, { useState } from "react";

import { Select, SelectField, TextField, TrashIcon } from "@/components";

import PhoneIcon from "@/image/icons/phone.svg";
import AddressIcon from "@/image/icons/address.svg";
import FacebookIcon from "@/image/icons/facebook.svg";
import InstagramIcon from "@/image/icons/instagram.svg";
import EmailIcon from "@/image/icons/mail.svg";

export const ContactsCreator: React.FC = () => {
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);

  const contactsComponents = {
    phone: Phone,
    email: Email,
    address: Address,
    facebook: Facebook,
    instagram: Instagram,
  };

  const contactsOptions = [
    { value: "phone", label: "Phone" },
    { value: "email", label: "Email" },
    { value: "address", label: "Address" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
  ];

  const onContactSelect = (contact: any) => {
    setSelectedContacts((_contacts) => [
      ..._contacts,
      // @ts-ignore
      contactsComponents[contact],
    ]);
  };

  const onDelete = (contact: any) => {
    console.log(contact);
    setSelectedContacts((_contacts) => _contacts.filter((c) => c !== contact));
  };

  return (
    <>
      <SelectField
        options={contactsOptions}
        onSelect={onContactSelect}
        placeholder="Add a contact"
        name={""}
        label="Select contact type"
      />
      <div className="contacts-list">
        {selectedContacts.map((SelectedContact, index) => {
          // @ts-ignore
          return <SelectedContact index={index} onDelete={onDelete} />;
        })}
      </div>
    </>
  );
};

const Phone = ({ index, onDelete }: { index: number; onDelete: any }) => {
  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={PhoneIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts[${index}].person`}
            placeholder="Contact person"
            label="Contact person"
          />
          <TextField
            name={`contacts[${index}].contact`}
            label="Phone number"
            placeholder="Phone number"
          />
        </div>
      </div>
      {/* <div className="contact-item__remove" onClick={() => onDelete("phone")}>
        <TrashIcon />
      </div> */}
    </div>
  );
};

const Email = ({ index, onDelete }: { index: number; onDelete: any }) => {
  return (
    <div className="contact-item">
      <div className="contanct-item__content">
        <div className="contact-item__image">
          <img src={EmailIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts[${index}].person`}
            label="Contact person"
            placeholder="Contact person"
          />
          <TextField
            name={`contacts[${index}].contact`}
            placeholder="Email"
            label="Email"
          />
        </div>
      </div>
      {/* <div className="contact-item__remove" onClick={() => onDelete("email")}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
const Address = ({ index, onDelete }: { index: number; onDelete: any }) => {
  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={AddressIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts[${index}].contact`}
            placeholder="Address"
            label="Address"
          />
        </div>
      </div>
      {/* <div className="contact-item__remove" onClick={() => onDelete("address")}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
const Facebook = ({ index, onDelete }: { index: number; onDelete: any }) => {
  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={FacebookIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts[${index}].contact`}
            placeholder="Facebook"
            label="Facebook"
          />
        </div>
      </div>
      {/* <div
        className="contact-item__remove"
        onClick={() => onDelete("facebook")}
      >
        <TrashIcon />
      </div> */}
    </div>
  );
};
const Instagram = ({ index, onDelete }: { index: number; onDelete: any }) => {
  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={InstagramIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts[${index}].contact`}
            placeholder="Instagram"
            label="Instagram"
          />
        </div>
      </div>
      {/* <div
        className="contact-item__remove"
        onClick={() => onDelete("instagram")}
      >
        <TrashIcon />
      </div> */}
    </div>
  );
};
