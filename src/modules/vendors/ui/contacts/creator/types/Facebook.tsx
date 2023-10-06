import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import FacebookIcon from "@/image/icons/facebook.svg";
import { TextField } from "@/components";

export const Facebook = ({
  index,
  onDelete,
}: {
  index: number;
  onDelete: any;
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "facebook");
  }, []);

  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={FacebookIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts.${index}.contact`}
            placeholder="Facebook"
            label="Facebook"
            variant="filled"
          />
        </div>
      </div>
      {/* <div
        className="contact-item__remove"
        onClick={() => onDelete("facebook")}
      >
        <TrashIcon />
      </div> */}
    </div>
  );
};
