import React, { useEffect, useState } from 'react';
import { ProgressBar } from '@components/index';

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
  }, []);

  return (
    <div className="payment-progress">
      <h4 className="payment-progress__title">Budget utilization</h4>
      <div className="payment-progressbar">
        <ProgressBar value={Math.ceil(value)} />
      </div>
      <h5 className="payment-progress__subtitle">
        ${available} available, ${paid} already paid
      </h5>
      <div className="payments-info">
        <div className="payments-info__item">
          <div className="payments-info__item-amount">${scheduled}</div>
          <div className="payments-info__item-label">Scheduled payments</div>
        </div>
        <div className="payments-info__item">
          <div className="payments-info__item-amount">${perGuest}</div>
          <div className="payments-info__item-label">Total per guest</div>
        </div>
      </div>
    </div>
  );
};
