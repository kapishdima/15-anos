import React from 'react';
import { PurchaseCategoriesList } from '../../purchase-categories/PurchaseCategoriesList';
import { ManualWishList } from './ManualWishlist';

export const Wishlist: React.FC = () => {
  return (
    <div className="shopping-list">
      <ManualWishList />
      <PurchaseCategoriesList />
    </div>
  );
};
