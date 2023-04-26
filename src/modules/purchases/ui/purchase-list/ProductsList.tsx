import React from 'react';
import { ProductCard } from './ProductCard';

type Product = {
  image: string;
  name: string;
  popular?: boolean;
  liked?: boolean;
};

type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard {...product} />
      ))}
    </div>
  );
};
