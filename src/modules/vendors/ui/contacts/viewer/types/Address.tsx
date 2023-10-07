import React from "react";

import { ContactItemBaseProps } from "./props";
import { useVendorsStore } from "@/modules/vendors/store/vendors.store";

export const Address: React.FC<ContactItemBaseProps> = ({
  value,
  vendorId,
  action,
}) => {
  const sendVendorAction = useVendorsStore((state) => state.sendVendorAction);

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    sendVendorAction(vendorId, action);
  };

  return (
    <a
      href={`https://www.google.com/maps?q=${encodeURIComponent(value)}`}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={onClick}
    >
      {value}
    </a>
  );
};
