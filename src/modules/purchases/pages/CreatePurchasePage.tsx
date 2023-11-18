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

import { useProductsStore } from "../store/products";
import { useManualShoppingStore } from "../store/manual_shopping_list";
import { useManualWishList } from "../store/manual_wish_list";
import { CreatePurchaseForm } from "../ui/create-purchase/CreatePurchaseForm";

const defaultValues = {
  title: "",
  description: "",
  url: "",
  image: "",
};

export const CreatePurchasePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("activeTab");

  const addProduct = useProductsStore((state) => state.addProduct);
  const fetchManualShoppingList = useManualShoppingStore(
    (state) => state.fetchManualShoppingList
  );
  const fetchManualWishList = useManualWishList(
    (state) => state.fetchManualWishList
  );
  const loading = useManualShoppingStore((state) => state.loading);

  const createPurchase = async (values: any) => {
    await addProduct(activeTab === "0" ? "shopping" : "registry", values);
    fetchManualShoppingList(/*force*/ true);
    fetchManualWishList(/*force*/ true);
    navigate(-1);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Purchase")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form onSubmit={createPurchase} initialValues={defaultValues}>
            <CreatePurchaseForm />
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
                {t("Save the item")}
              </Button>
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
