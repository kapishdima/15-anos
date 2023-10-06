import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

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

export const CreatePaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const loading = usePaymentsStore((state) => state.loading);
  const addPayment = usePaymentsStore((state) => state.addPayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);

  const createPayment = async (values: any) => {
    await addPayment(values);
    await fetchPayments(/*force*/ true);
    navigate(-1);
  };

  const defaultValues = {
    title: "",
    notes: "",
    date: new Date(),
    pay: "0",
    paid: "0",
    categoryId: searchParams.get("categoryId") || "Artists",
    vendorId: searchParams.get("vendorId"),
  };

  return (
    <AppLayout>
      <PageHeader title={t("Payment details")} hasBackButton />

      <div className="payment-page-container">
        <FormContent>
          <Form
            onSubmit={createPayment}
            initialValues={defaultValues}
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
              <Button
                aria-label="Close this dialog window"
                variant="success"
                loading={loading}
                type="submit"
              >
                {t("Save the payment")}
              </Button>
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
