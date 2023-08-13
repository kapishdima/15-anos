import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import AddressIcon from "@/image/icons/address.svg";
import { TextField } from "@/components";

export const Address = ({
  index,
  onDelete,
}: {
  index: number;
  onDelete: any;
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "address");
  }, []);

  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={AddressIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts.${index}.contact`}
            placeholder="Address"
            label="Address"
          />
        </div>
      </div>
      {/* <div className="contact-item__remove" onClick={() => onDelete("address")}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
