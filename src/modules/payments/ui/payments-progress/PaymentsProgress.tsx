import React, { useEffect, useState } from 'react';
import { ProgressCard } from '@/components';

type PaymentsProgressProps = {
  available: number;
  paid: number;
  scheduled: number;
  perGuest: number;
};

export const PaymentsProgress: React.FC<PaymentsProgressProps> = ({
  available,
  paid,
  scheduled,
  perGuest,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const progress = (paid / available) * 100;
      setValue(progress);
    }, 300);

    return () => clearTimeout(id);
  }, [available, paid]);

  return (
    <ProgressCard
      value={value}
      title="Budget utilization"
      hint={`$${available} available, $${paid} already paid`}
      extra={
        <div className="progress-card__extra">
          <div className="progress-card__extra-item">
            <div className="progress-card__extra-item__amount">${scheduled}</div>
            <div className="progress-card__extra-item__label">Scheduled payments</div>
          </div>
          <div className="progress-card__extra-item">
            <div className="progress-card__extra-item__amount">${perGuest}</div>
            <div className="progress-card__extra-item__label">Total per guest</div>
          </div>
        </div>
      }
    />
  );
};
