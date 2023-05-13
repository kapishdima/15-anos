import React from 'react';

import isToday from 'date-fns/isToday';
import isPast from 'date-fns/isPast';
import classNames from 'classnames';

import { PaymentViewModal } from '@modules/payments';
import { useTranslation } from 'react-i18next';

type PaymentDayProps = {
  title: string;
  payments: PaymentViewModal[];
};

export const PaymentDay: React.FC<PaymentDayProps> = ({ payments, title }) => {
  const hasExpiresTasks = payments.filter((payment) => !payment.wasPaid).length > 0;
  const hasDayPassed = !isToday(new Date(title)) && isPast(new Date(title));

  const { t } = useTranslation();

  const formattedDate = t('Format Date', { date: new Date(Date.parse(title)) });

  return (
    <div
      className={classNames('task-list__group-title', {
        expires: hasExpiresTasks && hasDayPassed,
      })}>
      {formattedDate}
    </div>
  );
};
