import React, { useEffect, useState } from 'react';
import { ProgressCard } from '@components/index';

type GuestProgressProps = {
  total: number;
  confirmed: number;
};

export const GuestProgress: React.FC<GuestProgressProps> = ({ total, confirmed }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const progress = (confirmed / total) * 100;
      setValue(progress);
    }, 300);

    return () => clearTimeout(id);
  }, []);

  return (
    <ProgressCard
      title="Guest confirmations"
      value={value}
      hint={`${confirmed} of ${total} guest have confirmed their participation`}
    />
  );
};
