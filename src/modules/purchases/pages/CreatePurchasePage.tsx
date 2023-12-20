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

  const createManualShoppingProduct = useManualShoppingStore(
    (state) => state.createManualShoppingProduct
  );
  const createManualWishProduct = useManualWishList(
    (state) => state.createManualWishProduct
  );
  const fetchManualShoppingList = useManualShoppingStore(
    (state) => state.fetchManualShoppingList
  );
  const fetchManualWishList = useManualWishList(
    (state) => state.fetchManualWishList
  );

  const createLoadingShopping = useManualShoppingStore(
    (state) => state.createLoading
  );
  const createLoadingWish = useManualWishList((state) => state.createLoading);

  const createPurchase = async (values: any) => {
    if (activeTab === "0") {
      await createManualShoppingProduct(values);
    } else {
      await createManualWishProduct(values);
    }
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
                loading={
                  activeTab === "0" ? createLoadingShopping : createLoadingWish
                }
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
