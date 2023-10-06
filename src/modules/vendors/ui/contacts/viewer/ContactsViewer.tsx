import React, { useState } from "react";
import { usePopper } from "react-popper";
import { useTranslation } from "react-i18next";

import { VendorContacts } from "@/modules/vendors/store/vendors.types";
import { Button } from "@/components";

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
  placement = "bottom-end",
  buttonText = "Contact",
}) => {
  const { t } = useTranslation();

  const [opened, setOpened] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  if (!contacts || !contacts.length) {
    return null;
  }

  return (
    <>
      <Button
        ref={setReferenceElement}
        variant="success"
        onClick={toogleOpened}
        propagateEvent={false}
      >
        {t(buttonText)}
      </Button>
      <div
        id="tooltip"
        data-show={opened}
        ref={setPopperElement as any}
        style={styles.popper}
        {...attributes.popper}
      >
        {contacts.map((contact) => {
          const Component = contactsComponents[contact.type];
          if (!Component) {
            return null;
          }
          return <Component value={contact.contact} />;
        })}
      </div>
    </>
  );
};
