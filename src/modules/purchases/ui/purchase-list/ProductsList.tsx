import React from 'react';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/app/router/routes';

type Product = {
  image: string;
  name: string;
  popular?: boolean;
  liked?: boolean;
};

type ProductsListProps = {
  products: Product[];
  type: 'products' | 'ideas';
};

export const ProductsList: React.FC<ProductsListProps> = ({ products, type }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <Link to={`${AppRoutes.PURCHASES_BEST_IDEAS}/${type}/1`}>
          <ProductCard {...product} />
        </Link>
      ))}
    </div>
  );
};
