import React, { useEffect } from "react";

import { Tabs, AppLayout, PageHeader } from "@components/index";

import {
  CreatePayment,
  RemovePayment,
  PaymentsProgress,
  usePaymentsStore,
  PaymentsListByCategories,
  PaymentsListByDate,
  ToggleVisibilityCompleted,
} from "@modules/payments";

import { useCategoriesStore } from "@modules/categories";

import { usePaymentDetailsStore } from "../store/payment-details";

export const PaymentsIndex: React.FC = () => {
  const payments = usePaymentsStore((state) => state.paymentsForView);
  const paymentsLoading = usePaymentsStore((state) => state.loading);

  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const categoriesLoading = useCategoriesStore((state) => state.loading);

  const fetchPaymentDetails = usePaymentDetailsStore(
    (state) => state.fetchPaymentDetails
  );
  const paymentDetailsLoading = usePaymentDetailsStore(
    (state) => state.loading
  );

  useEffect(() => {
    fetchPayments();
    fetchCategories();
    fetchPaymentDetails();
  }, []);

  return (
    <AppLayout
      loading={paymentsLoading && categoriesLoading && paymentDetailsLoading}
    >
      <div className="home-page">
        <PageHeader
          title="Payments"
          actions={
            <>
              <RemovePayment />
              <CreatePayment />
            </>
          }
        />

        {payments && (
          <>
            <PaymentsProgress />
            <Tabs
              extra={<ToggleVisibilityCompleted />}
              tabs={[
                { title: "By date", component: <PaymentsListByDate /> },
                {
                  title: "By category",
                  component: <PaymentsListByCategories />,
                },
              ]}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
};
