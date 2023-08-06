import React from "react";

export const AddFilledIcon: React.FC = () => {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="45" cy="45" r="35" fill="#ed819e" />
      <rect x="44" y="32" width="3" height="25" rx="1.5" fill="white" />
      <rect
        x="58"
        y="43"
        width="3"
        height="25"
        rx="1.5"
        transform="rotate(90 58 43)"
        fill="white"
      />
    </svg>
  );
};
