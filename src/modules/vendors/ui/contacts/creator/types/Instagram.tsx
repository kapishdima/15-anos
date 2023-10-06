import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import InstagramIcon from "@/image/icons/instagram.svg";
import { TextField } from "@/components";

export const Instagram = ({
  index,
  onDelete,
}: {
  index: number;
  onDelete: any;
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "instagram");
  }, []);

  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={InstagramIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts.${index}.contact`}
            placeholder="Instagram"
            label="Instagram"
            variant="filled"
          />
        </div>
      </div>
      {/* <div
        className="contact-item__remove"
        onClick={() => onDelete("instagram")}
      >
        <TrashIcon />
      </div> */}
    </div>
  );
};
