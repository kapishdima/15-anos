import React from "react";
import { Guest } from "../../store/guests";
import { GuestCard } from "./GuestCard";

type GuestListProps = {
  guests: Guest[];
};

export const GuestList: React.FC<GuestListProps> = ({ guests }) => {
  return (
    <div className="guest-list">
      {guests.map((guest) => (
        <GuestCard guest={guest} key={guest.id} />
      ))}
    </div>
  );
};
