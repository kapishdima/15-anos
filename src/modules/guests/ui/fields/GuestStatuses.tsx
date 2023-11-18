import React from "react";
import {
  ConfirmedIcon,
  InvitedIcon,
  QuestionIcon,
  Select,
  WontComeIcon,
} from "@/components";

type GuestStatusesSelectProps = {
  onSelect?: (value: string) => void;
  defaultSelect?: string;
};

const statuses = [
  { value: "none", label: "Not invited", icon: <QuestionIcon /> },
  { value: "invited", label: "Invited", icon: <InvitedIcon /> },
  { value: "declined", label: "Won't come", icon: <WontComeIcon /> },
  {
    value: "confirmed",
    label: "Confirmed participation",
    icon: <ConfirmedIcon />,
  },
];

export const GuestStatusesSelect: React.FC<GuestStatusesSelectProps> = ({
  onSelect,
  defaultSelect,
}) => {
  return (
    <Select
      options={statuses}
      onSelect={onSelect}
      placeholder="Status"
      appearence="button"
      showSelectedValue={false}
      defaultSelected={defaultSelect}
    />
  );
};
