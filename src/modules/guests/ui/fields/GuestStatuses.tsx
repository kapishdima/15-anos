import { ConfirmedIcon, InvitedIcon, QuestionIcon, Select, WontComeIcon } from '@/components';
import React from 'react';

type GuestStatusesSelectProps = {
  onSelect?: (value: string) => void;
  defaultSelect?: string;
};

const statuses = [
  { value: 'none', label: 'Not Invited', icon: <QuestionIcon /> },
  { value: 'invited', label: 'Invited', icon: <InvitedIcon /> },
  { value: 'declined', label: "Wont't come", icon: <WontComeIcon /> },
  { value: 'confirmed', label: 'Confirmed participation', icon: <ConfirmedIcon /> },
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
      variant="button"
      showSelectedValue={false}
      defaultSelected={defaultSelect}
    />
  );
};
