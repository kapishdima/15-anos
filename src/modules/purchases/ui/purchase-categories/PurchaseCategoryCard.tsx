import { AppRoutes } from '@/app/router/routes';
import React from 'react';
import { Link } from 'react-router-dom';

type PurchaseCategoryCardProps = {
  id: string;
  name: string;
  image: string;
};

export const PurchaseCategoryCard: React.FC<PurchaseCategoryCardProps> = ({ id, name, image }) => {
  const url = AppRoutes.PURCHASES_BEST_IDEAS + '/' + id;
  return (
    <Link to={url} className="purchase-category-card__link">
      <div className="purchase-category-card" style={{ backgroundImage: `url(${image})` }}>
        <div className="purchase-category-card__title">{name}</div>
      </div>
    </Link>
  );
};
