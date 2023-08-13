import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import PhoneIcon from "@/image/icons/phone.svg";
import { TextField } from "@/components";

export const Phone = ({
  index,
  onDelete,
}: {
  index: number;
  onDelete: any;
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "phone");
  }, []);

  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={PhoneIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts.${index}.person`}
            placeholder="Contact person"
            label="Contact person"
          />
          <TextField
            name={`contacts.${index}.contact`}
            label="Phone number"
            placeholder="Phone number"
          />
        </div>
      </div>
      {/* <div className="contact-item__remove" onClick={() => onDelete("phone")}>
          <TrashIcon />
        </div> */}
    </div>
  );
};
