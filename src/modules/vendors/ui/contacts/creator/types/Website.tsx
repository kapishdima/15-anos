import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import WebsiteIcon from "@/image/icons/website.svg";
import { TextField } from "@/components";

export const Website = ({
  index,
  onDelete,
}: {
  index: number;
  onDelete: any;
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`contacts.${index}.type`, "website");
  }, []);

  return (
    <div className="contact-item">
      <div className="contact-item__content">
        <div className="contact-item__image">
          <img src={WebsiteIcon} alt="" />
        </div>
        <div className="contact-item__fields">
          <TextField
            name={`contacts.${index}.contact`}
            label="Website"
            placeholder="Website"
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
};
