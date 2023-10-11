import React, { useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { VendorContacts } from "@/modules/vendors/store/vendors.types";
import { Button, Popover } from "@/components";

import { Phone } from "./types/Phone";
import { Address } from "./types/Address";
import { Email } from "./types/Email";
import { Instagram } from "./types/Instagram";
import { Facebook } from "./types/Facebook";
import { Placement } from "@popperjs/core";
import { Website } from "./types/Website";

type ContactViewerProps = {
  contacts: VendorContacts;
  placement?: Placement;
  buttonText?: string;
  vendorId: string;
};

const contactsComponents = {
  phone: Phone,
  mail: Email,
  address: Address,
  facebook: Facebook,
  instagram: Instagram,
  website: Website,
};

export const ContactViewer: React.FC<ContactViewerProps> = ({
  contacts,
  vendorId,
  placement = "bottom-end",
  buttonText = "Contact",
}) => {
  const { t } = useTranslation();

  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  if (!contacts || !contacts.length) {
    return null;
  }

  return (
    <Popover
      ref={triggerRef}
      onClickOutside={() => setOpened(false)}
      placement={placement}
      opened={opened}
      triggerElement={
        <Button
          ref={triggerRef}
          variant="success"
          onClick={toogleOpened}
          propagateEvent={false}
        >
          {t(buttonText)}
        </Button>
      }
    >
      {contacts.map((contact) => {
        const Component = contactsComponents[contact.type];
        if (!Component) {
          return null;
        }
        return (
          <Component
            value={contact.contact}
            vendorId={vendorId}
            action={contact.type}
          />
        );
      })}
    </Popover>
  );
};
