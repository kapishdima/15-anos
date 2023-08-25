import React from "react";
import { Link } from "react-router-dom";

import { AppRoutes } from "@/app/router/routes";
import Emptyphoto from "@/image/emptyphoto.png";
import { translated } from "@/app/utils/locale";

type PurchaseCategoryCardProps = {
  id: string;
  name: string;
  image: string;
  type: "shopping" | "registry";
};

export const PurchaseCategoryCard: React.FC<PurchaseCategoryCardProps> = ({
  id,
  name,
  image,
  type,
}) => {
  const url = AppRoutes.PURCHASES_BEST_IDEAS + "/" + id + `?type=${type}`;
  return (
    <Link to={url} className="purchase-category-card__link">
      <div
        className="purchase-category-card"
        style={{ backgroundImage: `url(${image || Emptyphoto})` }}
      >
        <div className="purchase-category-card__title">{translated(name)}</div>
      </div>
    </Link>
  );
};
