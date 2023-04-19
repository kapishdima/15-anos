import { ConfirmedIcon, InvitedIcon, Select, WontComeIcon } from '@/components';
import React from 'react';

type GuestStatusesSelectProps = {
  onSelect?: (value: string) => void;
  defaultSelect?: string;
};

const statuses = [
  { value: 'invited', label: 'Invited', icon: <InvitedIcon /> },
  { value: 'wont_come', label: "Wont't come", icon: <WontComeIcon /> },
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
      defaultSelected={defaultSelect}
    />
  );
};
