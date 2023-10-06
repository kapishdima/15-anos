import React from "react";
import {
  AppLayout,
  Button,
  Form,
  FormActions,
  FormContent,
  PageHeader,
} from "@/components";
import { useTranslation } from "react-i18next";
import { CreateVendorForm } from "../ui/create-vendor/CreateVendorForm";
import { useVendorsStore } from "../store/vendors.store";
import { useNavigate } from "react-router-dom";
import { VendorTasksList } from "../ui/vendors-list/VendorTasksList";
import { VendorPaymentsList } from "../ui/vendors-list/VendorPaymentsList";

export const UpdateVendorPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const vendor = useVendorsStore((state) => state.currentVendor);
  const updateVendor = useVendorsStore((state) => state.updateVendor);
  const removeVendor = useVendorsStore((state) => state.removeManualVendor);
  const fetchManualVendors = useVendorsStore(
    (state) => state.fetchManualVendor
  );
  const actionId = useVendorsStore((state) => state.actionId);
  const actionLoading = useVendorsStore((state) => state.actionLoading);

  const onDelete = () => {
    if (!vendor?.id) {
      return;
    }
    removeVendor(vendor.id);
    fetchManualVendors(/*force*/ true);
    navigate(-1);
  };

  const updateVendorOnClick = async (values: any) => {
    if (!vendor?.id) {
      return;
    }

    await updateVendor(vendor.id, values);
    fetchManualVendors(/*force*/ true);
    navigate(-1);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Vendors details")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form onSubmit={updateVendorOnClick} initialValues={vendor}>
            <CreateVendorForm />
            <div className="extra-container">
              <h2 className="extra-container__title heading1">{t("Tasks")}</h2>
              <VendorTasksList
                id={vendor?.id || ""}
                categoryId={vendor?.categoryId || ""}
              />
            </div>
            <div className="extra-container">
              <h2 className="extra-container__title heading1">
                {t("Payments")}
              </h2>
              <VendorPaymentsList
                id={vendor?.id || ""}
                categoryId={vendor?.categoryId || ""}
              />
            </div>
            <FormActions>
              <Button appearance="ghost" variant="error">
                {t("Cancel")}
              </Button>
              <Button variant="error" onClick={onDelete}>
                {t("Delete")}
              </Button>
              <Button
                aria-label="Close this dialog window"
                variant="success"
                loading={actionLoading && actionId === vendor?.id}
                type="submit"
              >
                {t("Save the vendor")}
              </Button>
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
