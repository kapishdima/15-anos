import React from "react";

import { ContactItemBaseProps } from "./props";

export const Address: React.FC<ContactItemBaseProps> = ({ value }) => {
  return (
    <a
      href={`https://www.google.com/maps?q=${encodeURIComponent(value)}`}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {value}
    </a>
  );
};
