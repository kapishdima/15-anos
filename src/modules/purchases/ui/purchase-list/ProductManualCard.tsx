import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { translated } from "@/app/utils/locale";

import { ProductTypes, ProductViewModal } from "../../store/purcheses.types";
import { useProductsStore } from "../../store/products";

type ProductManualCardProps = {
  product: ProductViewModal;
  type: ProductTypes;
};

export const ProductManualCard: React.FC<ProductManualCardProps> = ({
  product,
  type,
}) => {
  const saveProduct = useProductsStore((state) => state.saveProduct);

  return (
    <Link
      to={`${AppRoutes.PURCHASES_BEST_IDEAS}?type=${type}`}
      onClick={() => saveProduct(product)}
    >
      <div className="product-item">
        <div className="product-item__image">
          <img src={product.imageSmall || product.image} alt="" />
        </div>
        <div className="product-item__name">{translated(product.title)}</div>
      </div>
    </Link>
  );
};
