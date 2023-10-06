import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  AppLayout,
  Button,
  Form,
  FormActions,
  FormContent,
  PageHeader,
} from "@/components";

import { CreatePaymentForm } from "../ui/create-payment/CreatePaymentForm";
import { usePaymentsStore } from "../store/payments";
import { createPaymentSchemaValidation } from "../validations/payments.schema";
import { CreatePaymentActions } from "../ui/buttons/CreatePaymentActions";

export const UpdatePaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const payment = usePaymentsStore((state) => state.currentPayment);
  const removePayment = usePaymentsStore((state) => state.removePayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);
  const updatePayment = usePaymentsStore((state) => state.updatePayment);
  const changePaymentStatus = usePaymentsStore(
    (state) => state.changePaymentStatus
  );

  const loading = usePaymentsStore((state) => state.loading);

  const onDelete = () => {
    console.log(payment);
    if (!payment) {
      return null;
    }
    removePayment(payment.id);
    fetchPayments(/*force*/ true);
    navigate(-1);
  };

  const onUpdatePayment = async (values: any) => {
    if (!payment) {
      return null;
    }
    await updatePayment(payment.id, values);
    fetchPayments(/*force*/ true);
    navigate(-1);
  };

  const onUpdatePaymentStatus = async () => {
    if (!payment) {
      return null;
    }
    const status = payment.isCompleted ? "not_paid" : "paid";
    await changePaymentStatus(payment.id, payment.pay, status);
    fetchPayments(/*force*/ true);
    navigate(-1);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Payment details")} hasBackButton />

      <div className="payment-page-container">
        <FormContent>
          <Form
            onSubmit={onUpdatePayment}
            initialValues={{
              ...payment,
              date:
                typeof payment?.date === "string"
                  ? new Date(payment?.date)
                  : payment?.date,
              pay: payment?.pay.toString(),
              paid: payment?.paid.toString(),
            }}
            schema={createPaymentSchemaValidation}
          >
            <CreatePaymentForm />
            <FormActions>
              <Button
                appearance="ghost"
                variant="error"
                onClick={() => navigate(-1)}
              >
                {t("Cancel")}
              </Button>
              <Button variant="error" onClick={onDelete}>
                {t("Delete")}
              </Button>
              <CreatePaymentActions
                loading={loading}
                isCompleted={Boolean(payment?.isCompleted)}
                updatePaymentStatus={onUpdatePaymentStatus}
              />
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
