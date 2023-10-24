import React from "react";

import { useTranslation } from "react-i18next";

import { Card } from "@/components";
import { usePaymentsStore } from "@modules/payments";
import { getCategoryImage } from "@/app/utils/category-icon";

import { PaymentViewModal } from "../../store/payments";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { PaymentPrice } from "./PaymentPrice";
import { RoleActions } from "@/modules/roles";

type PaymentCardProps = {
  payment: PaymentViewModal;
  categoryId: string;
  color?: string;
  hint?: string;
  isRemoval?: boolean;
  onUpdateStatusSuccess?: () => void;
};

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  isRemoval,
  categoryId,
  hint,
  onUpdateStatusSuccess,
  color = "#db5b78",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formatCompletedDate = t("Format Date", {
    date: new Date(
      payment.completed === "Invalid Date" ? Date.now() : payment.completed
    ),
  });

  const setCurrentPayment = usePaymentsStore(
    (state) => state.setCurrentPayment
  );
  const removePayment = usePaymentsStore((state) => state.removePayment);
  const fetchPayments = usePaymentsStore((state) => state.fetchPayments);
  const changePaymentStatus = usePaymentsStore(
    (state) => state.changePaymentStatus
  );
  const paymentProccessingId = usePaymentsStore(
    (state) => state.paymentInProcessing
  );

  const loading = usePaymentsStore((state) => state.loading);

  const onOpen = () => {
    setCurrentPayment(payment);
    navigate(AppRoutes.UPDATE_PAYMENT);
  };

  const onDelete = () => {
    removePayment(payment.id);
    fetchPayments(/*force*/ true);
  };

  const onUpdatePaymentStatus = async () => {
    const status = payment.isCompleted ? "not_paid" : "paid";
    await changePaymentStatus(payment.id, payment.pay, status);
    fetchPayments(/*force*/ true);
    if (onUpdateStatusSuccess) {
      onUpdateStatusSuccess();
    }
  };

  return (
    <>
      <Card
        id={payment.id}
        title={payment.title}
        icon={getCategoryImage(categoryId as any)}
        color={color}
        completed={payment.isCompleted}
        removal={isRemoval}
        onOpen={onOpen}
        onDelete={onDelete}
        onIconClick={onUpdatePaymentStatus}
        hint={hint}
        showHint={!payment.isCompleted}
        showDescription={payment.paid > 0}
        loading={loading && paymentProccessingId === payment.id}
        description={
          payment.isCompleted
            ? `${t("Paid")} ${formatCompletedDate}`
            : `${t("Already paid")}: ${payment.paid} $`
        }
        extra={<PaymentPrice price={payment.pay} />}
        action={RoleActions.EDIT_PAYMENTS}
      />
    </>
  );
};
