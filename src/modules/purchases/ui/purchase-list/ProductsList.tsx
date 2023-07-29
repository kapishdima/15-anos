import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@/app/router/routes';

import { ProductCard } from './ProductCard';
import { ProductViewModal } from '../../store/purcheses.types';
import { useProductsStore } from '../../store/products';

type ProductsListProps = {
  products: ProductViewModal[];
  type: 'products' | 'ideas';
};

export const ProductsList: React.FC<ProductsListProps> = ({ products, type }) => {
  const saveProduct = useProductsStore((state) => state.saveProduct);

  return (
    <div className="products-list">
      {products.map((product) => (
        <Link to={`${AppRoutes.PURCHASES_BEST_IDEAS}`} onClick={() => saveProduct(product)}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};
