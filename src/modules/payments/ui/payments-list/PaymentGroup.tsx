import React from 'react';

import { getCategoryById, useCategoriesStore } from '@modules/categories';
import { PaymentViewModal, usePaymentsStore, groupedByDate } from '@modules/payments';

import { PaymentCard } from './PaymentCard';
import { PaymentsMonth } from './PaymentsMonth';
import { PaymentDay } from './PaymentsDay';

import MockTaskIcon from '@image/icons/task-icon.svg';
import { useTranslation } from 'react-i18next';

type PaymentGroupProps = {
  title: string;
  payments: PaymentViewModal[];
  hasCardHint?: boolean;
};

export const PaymentGroup: React.FC<PaymentGroupProps> = ({ title, payments, hasCardHint }) => {
  const { t } = useTranslation();
  const categoriesStore = useCategoriesStore();
  const paymentsStore = usePaymentsStore();

  const groupTitle = title.split(',')[0];

  return (
    <>
      <PaymentsMonth title={groupTitle} tasks={payments} key={groupTitle} />

      {Object.entries(groupedByDate(payments)).map(([date, dayPayments]) => {
        const formattedDate = t('Format Date', { date: new Date(Date.parse(date)) });

        return (
          <div className="task-list__group" key={`${groupTitle}_${formattedDate}`}>
            {!hasCardHint && <PaymentDay title={date} payments={dayPayments} />}
            {dayPayments.map((payment) => {
              const category = getCategoryById(categoriesStore.categories, payment.categoryId);
              const formatCompletedDate = t('Format Date', {
                date: new Date(payment.completed),
              });
              return (
                <PaymentCard
                  id={payment.id}
                  title={typeof payment.title === 'string' ? payment.title : payment.title['en']}
                  image={MockTaskIcon}
                  color={`#${category?.color}`}
                  categoryId={
                    typeof category?.title === 'string'
                      ? category.title
                      : category?.title['en'] || ''
                  }
                  date={payment.date}
                  notes={payment.notes}
                  completedDate={formatCompletedDate}
                  isCompleted={payment.isCompleted}
                  isRemoval={paymentsStore.isRemoval}
                  pay={payment.pay}
                  paid={payment.paid}
                  hint={hasCardHint ? formattedDate : undefined}
                  key={payment.id}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};
