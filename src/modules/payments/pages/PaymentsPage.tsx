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

export const PaymentsIndex: React.FC = () => {
  const paymentsStore = usePaymentsStore();
  const categoriesStore = useCategoriesStore();
  const { t } = useTranslation();

  useEffect(() => {
    paymentsStore.fetchTasks();
    categoriesStore.fetchCategories();
  }, []);

  return (
    <AppLayout loading={paymentsStore.loading && categoriesStore.loading}>
      <div className="home-page">
        <PageHeader
          title={t('Payments')}
          actions={
            <>
              <CreatePayment />
              <RemovePayment removal={paymentsStore.isRemoval} />
            </>
          }
        />

        {paymentsStore.tasks && (
          <div className="tasks-info">
            <PaymentsProgress available={1000} paid={0} scheduled={500} perGuest={50} />
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
