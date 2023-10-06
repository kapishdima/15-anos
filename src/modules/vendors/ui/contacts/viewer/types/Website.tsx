import React from "react";

import { ContactItemBaseProps } from "./props";

export const Website: React.FC<ContactItemBaseProps> = ({ value }) => {
  return (
    <a
      href={value}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      Website
    </a>
  );
};
