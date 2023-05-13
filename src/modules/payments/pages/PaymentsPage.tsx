import React, { useEffect } from 'react';
import { AppLayout, PageHeader } from '@components/index';

import {
  CreatePayment,
  RemovePayment,
  PaymentsProgress,
  usePaymentsStore,
  PaymentsListByCategories,
  PaymentsListByDate,
  ToggleVisibilityCompleted,
} from '@modules/payments';

import { useCategoriesStore } from '@modules/categories';

import { Tabs } from '@components/index';
import { useTranslation } from 'react-i18next';
import { usePaymentDetailsStore } from '../store/payment-details';

export const PaymentsIndex: React.FC = () => {
  const { t } = useTranslation();

  const payments = usePaymentsStore((state) => state.paymentsForView);

  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const paymentsLoading = usePaymentsStore((state) => state.loading);
  const isRemoval = usePaymentsStore((state) => state.isRemoval);

  const categoriesLoading = useCategoriesStore((state) => state.loading);

  const fetchPaymentDetails = usePaymentDetailsStore((state) => state.fetchPaymentDetails);
  const paymentDetailsLoading = usePaymentDetailsStore((state) => state.loading);

  useEffect(() => {
    fetchPayments();
    fetchCategories();
    fetchPaymentDetails();
  }, []);

  return (
    <AppLayout loading={paymentsLoading && categoriesLoading && paymentDetailsLoading}>
      <div className="home-page">
        <PageHeader
          title={t('Payments')}
          actions={
            <>
              <CreatePayment />
              <RemovePayment removal={isRemoval} />
            </>
          }
        />

        {payments && (
          <div className="tasks-info">
            <PaymentsProgress />
            <Tabs
              extra={<ToggleVisibilityCompleted />}
              tabs={[
                { title: 'By Data', component: <PaymentsListByDate /> },
                { title: 'By Category', component: <PaymentsListByCategories /> },
              ]}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};
