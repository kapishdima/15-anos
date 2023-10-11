import React from "react";

import { PlusIcon } from "@components/icons";
import { AddFilledIcon, Button, IconButton, useModal } from "@components/index";

import { Protected, RoleActions } from "@modules/roles";
import { CreatePurchaseModal } from "../create-purchase/CreatePurchaseModal";
import { useManualShoppingStore } from "../../store/manual_shopping_list";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProductsStore } from "../../store/products";
import { useManualWishList } from "../../store/manual_wish_list";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/app/router/routes";

const CREATE_PURCHASE_MODAL = "create_purchase";

type CreatePurchaseProps = {
  as?: "button" | "icon";
};

export const CreatePurchase: React.FC<CreatePurchaseProps> = ({
  as = "icon",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(AppRoutes.CREATE_PURCHASE);
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
    </Protected>
  );
};
