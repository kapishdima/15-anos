import React from 'react';
import { GuestStatusesSelect } from '../fields/GuestStatuses';

type GuestsStatusProps = {
  onSelect: (value: string) => void;
};

export const GuestsStatus: React.FC<GuestsStatusProps> = ({ onSelect }) => {
  return (
    <div className="guest-statuses">
      <GuestStatusesSelect onSelect={onSelect} />
    </div>
  );
};
