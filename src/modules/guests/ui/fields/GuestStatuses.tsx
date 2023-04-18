import { Select } from '@/components';
import React from 'react';

type GuestStatusesSelectProps = {
  onSelect?: (value: string) => void;
  defaultSelect?: string;
};

const statuses = [
  { value: 'invited', label: 'Invited' },
  { value: 'wont_come', label: "Wont't come" },
  { value: 'confirmed', label: 'Confirmed participation' },
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
