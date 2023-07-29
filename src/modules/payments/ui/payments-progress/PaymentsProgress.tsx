import React, { useEffect, useState } from 'react';
import { ProgressCard } from '@/components';
import {
  availableBudget,
  scheduledPayments,
  usePaymentsStore,
  usePaymentDetailsStore,
  alreadyPaid,
} from '@modules/payments';
import { paymentsAmount, perGuest } from '../../store/payments.selectors';
import { useTranslation } from 'react-i18next';

export const PaymentsProgress = () => {
  const { t } = useTranslation();

  const scheduled = usePaymentsStore(scheduledPayments);
  const paid = usePaymentsStore(alreadyPaid);
  const available = usePaymentDetailsStore((state) => availableBudget(state, paid));
  const paymentsSum = usePaymentsStore((state) => paymentsAmount(state));
  const paymentPerGuest = usePaymentDetailsStore((state) => perGuest(state, paymentsSum));

  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const progress = available > 0 ? (paid / available) * 100 : 0;
      setValue(progress);
    }, 300);

    return () => clearTimeout(id);
  }, [available, paid]);

  return (
    <ProgressCard
      value={value}
      title="Budget utilization"
      hint={`$${available} ${t('budget_available_2')} $${paid} ${t('budget_available_3')}`}
      extra={
        <div className="progress-card__extra">
          <div className="progress-card__extra-item">
            <div className="progress-card__extra-item__amount">${scheduled}</div>
            <div className="progress-card__extra-item__label">{t('Scheduled payments')}</div>
          </div>
          <div className="progress-card__extra-item">
            <div className="progress-card__extra-item__amount">${paymentPerGuest}</div>
            <div className="progress-card__extra-item__label">{t('Total per guest')}</div>
          </div>
        </div>
      }
    />
  );
};
