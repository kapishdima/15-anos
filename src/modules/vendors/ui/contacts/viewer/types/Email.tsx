import React from "react";

import { ContactItemBaseProps } from "./props";

export const Email: React.FC<ContactItemBaseProps> = ({ value }) => {
  return (
    <a
      href={`mailto:${value}`}
      target="_blank"
      className="contact-item"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      Contact to {value}
    </a>
  );
};
