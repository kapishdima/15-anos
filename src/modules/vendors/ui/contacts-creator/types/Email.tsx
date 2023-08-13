import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { TextField } from "@/components";
import EmailIcon from "@/image/icons/mail.svg";

export const Email = ({
  index,
  onDelete,
}: {
  index: number;
  onDelete: any;
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "mail");
  }, []);

  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={EmailIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts.${index}.person`}
            label="Contact person"
            placeholder="Contact person"
          />
          <TextField
            name={`contacts.${index}.contact`}
            placeholder="Email"
            label="Email"
          />
        </div>
      </div>
      {/* <div className="contact-item__remove" onClick={() => onDelete("email")}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
