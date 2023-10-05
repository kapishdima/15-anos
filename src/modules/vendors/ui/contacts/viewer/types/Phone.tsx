import React from "react";

import { ContactItemBaseProps } from "./props";

export const Phone: React.FC<ContactItemBaseProps> = ({ value }) => {
  return (
    <a
      href={`tel:${value}`}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      Call {value}
    </a>
  );
};
