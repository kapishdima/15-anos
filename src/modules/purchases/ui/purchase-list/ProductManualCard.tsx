import React from 'react';
import { ProductViewModal } from '../../store/purcheses.types';

type ProductManualCardProps = {
  product: ProductViewModal;
};

export const ProductManualCard: React.FC<ProductManualCardProps> = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-item__image">
        <img src={product.imageSmall || product.image} alt="" />
      </div>
      <div className="product-item__name">
        {typeof product.title === 'string' ? product.title : product.title.en}
      </div>
    </div>
  );
};
