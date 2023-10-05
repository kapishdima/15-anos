import React from "react";

import { ContactItemBaseProps } from "./props";

export const Facebook: React.FC<ContactItemBaseProps> = ({ value }) => {
  return (
    <a
      href={value}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      Facebook
    </a>
  );
};
