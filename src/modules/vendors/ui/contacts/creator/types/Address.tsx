import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import AddressIcon from "@/image/icons/address.svg";
import { TextField } from "@/components";

export const Address = ({ index }: { index: number }) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "address");
    setValue(`contacts.${index}.contact`, "");
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
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
};
