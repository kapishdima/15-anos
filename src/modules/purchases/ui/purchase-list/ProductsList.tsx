import React from "react";
import { Link, useParams } from "react-router-dom";

import { AppRoutes } from "@/app/router/routes";

import { ProductCard } from "./ProductCard";
import { ProductTypes, ProductViewModal } from "../../store/purcheses.types";
import { useProductsStore } from "../../store/products";

type ProductsListProps = {
  products: ProductViewModal[];
  type: ProductTypes;
  ratio?: number;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  type,
  ratio,
}) => {
  const saveProduct = useProductsStore((state) => state.saveProduct);
  const { id } = useParams();

  return (
    <div className="products-list">
      {products.map((product) => (
        <Link
          to={`${AppRoutes.PURCHASES_BEST_IDEAS}?type=${type}&category=${id}`}
          onClick={() => saveProduct(product)}
        >
          <ProductCard product={product} ratio={ratio} />
        </Link>
      ))}
    </div>
  );
};
