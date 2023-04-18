import React from 'react';
import { GuestStatusesSelect } from '../fields/GuestStatuses';

export const GuestsStatus: React.FC = () => {
  const onSelect = (value: string) => {
    console.log(value);
  };
  return (
    <div className="guest-statuses">
      <GuestStatusesSelect onSelect={onSelect} />
    </div>
  );
};
