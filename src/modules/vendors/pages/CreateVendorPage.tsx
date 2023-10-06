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

const defaultValues = {
  categoryId: "Artists",
  notes: "",
  title: "",
  contacts: [],
};

export const CreateVendorPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loading = useVendorsStore((state) => state.loading);
  const addVendor = useVendorsStore((state) => state.addVendor);
  const fetchManualVendor = useVendorsStore((state) => state.fetchManualVendor);

  const createVendor = async (values: any) => {
    await addVendor(values);
    navigate(-1);
    fetchManualVendor(/*force*/ true);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Vendors details")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form onSubmit={createVendor} initialValues={defaultValues}>
            <CreateVendorForm />
            <FormActions>
              <Button appearance="ghost" variant="error">
                {t("Cancel")}
              </Button>
              <Button
                aria-label="Close this dialog window"
                variant="success"
                loading={loading}
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
