import React, { useRef, useState } from "react";
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
import { useOnClickOutside } from "usehooks-ts";
import { useFormContext } from "react-hook-form";

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
  const containerElement = useRef(null);
  const referenceElement = useRef(null);
  const popperElement = useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    }
  );

  useOnClickOutside<HTMLDivElement>(containerElement, () => setOpened(false));

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  console.log(contacts);
  if (!contacts || !contacts.length) {
    return null;
  }

  return (
    <div ref={containerElement}>
      <Button
        ref={referenceElement}
        variant="success"
        onClick={toogleOpened}
        propagateEvent={false}
      >
        {t(buttonText)}
      </Button>
      <div
        id="tooltip"
        data-show={opened}
        ref={popperElement}
        style={styles.popper}
        {...attributes.popper}
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
      </div>
    </div>
  );
};
