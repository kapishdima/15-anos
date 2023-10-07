import React from "react";

import { ContactItemBaseProps } from "./props";
import { useVendorsStore } from "@/modules/vendors/store/vendors.store";

export const Instagram: React.FC<ContactItemBaseProps> = ({
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
      href={value}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={onClick}
    >
      Instagram
    </a>
  );
};
