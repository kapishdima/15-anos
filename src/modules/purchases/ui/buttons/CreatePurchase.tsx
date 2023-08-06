import React from "react";

import { PlusIcon } from "@components/icons";
import { AddFilledIcon, Button, IconButton, useModal } from "@components/index";

import { Protected, RoleActions } from "@modules/roles";
import { CreatePurchaseModal } from "../create-purchase/CreatePurchaseModal";
import { useManualShoppingStore } from "../../store/manual_shopping_list";
import { useSearchParams } from "react-router-dom";
import { useProductsStore } from "../../store/products";
import { useManualWishList } from "../../store/manual_wish_list";
import { useTranslation } from "react-i18next";

const CREATE_PURCHASE_MODAL = "create_purchase";

type CreatePurchaseProps = {
  as?: "button" | "icon";
};

export const CreatePurchase: React.FC<CreatePurchaseProps> = ({
  as = "icon",
}) => {
  const { t } = useTranslation();
  const { open, close } = useModal();
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

  const onClick = () => {
    open(CREATE_PURCHASE_MODAL);
  };

  const createPurchase = async (values: any) => {
    await addProduct(activeTab === "0" ? "shopping" : "registry", values);
    close(CREATE_PURCHASE_MODAL);
    fetchManualShoppingList(/*force*/ true);
    fetchManualWishList(/*force*/ true);
  };

  return (
    <Protected action={RoleActions.CREATE_PURCHASE}>
      {as === "icon" ? (
        <IconButton appearance="filled" variant="white" onClick={onClick}>
          <AddFilledIcon />
        </IconButton>
      ) : (
        <Button variant="text" appearance="ghost" onClick={onClick}>
          {t("Add manually")}
        </Button>
      )}
      <CreatePurchaseModal
        id={CREATE_PURCHASE_MODAL}
        onSubmit={createPurchase}
        loading={loading}
      />
    </Protected>
  );
};
