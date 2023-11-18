import React, { useEffect } from "react";
import { useVendorsRelations } from "../../store/vendors-relations";
import { TaskCard } from "@/modules/tasks";
import { getCategoryById, useCategoriesStore } from "@/modules/categories";
import { Link } from "react-router-dom";
import { Button, Spinner } from "@/components";
import { AppRoutes } from "@/app/router/routes";
import { PaymentCard } from "@/modules/payments/ui/payments-list/PaymentCard";
import { useTranslation } from "react-i18next";

type VendorTasksListProps = {
  id: string;
  categoryId: string;
};

export const VendorPaymentsList: React.FC<VendorTasksListProps> = ({
  id,
  categoryId,
}) => {
  const { t } = useTranslation();
  const fetchPayments = useVendorsRelations(
    (state) => state.fetchVendorPayments
  );
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const payments = useVendorsRelations((state) => state.payments);
  const categories = useCategoriesStore((state) => state.categories);
  const loading = useVendorsRelations((state) => state.loading);

  useEffect(() => {
    fetchPayments(id);
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="vendor-relation--loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="vendor-relation">
      <div className="vendor-relation-list">
        {payments.map((payment) => {
          const category = getCategoryById(categories, payment.categoryId);
          return (
            <PaymentCard
              payment={payment}
              isRemoval={false}
              color={category?.color}
              categoryId={category?.id || ""}
              onUpdateStatusSuccess={() => fetchPayments(id)}
            />
          );
        })}
      </div>
      <Link
        to={`${AppRoutes.CREATE_PAYMENT}?vendorId=${id}&categoryId=${categoryId}`}
        className="without-decoration"
      >
        <Button variant="success">{t("Add a payment")}</Button>
      </Link>
    </div>
  );
};
