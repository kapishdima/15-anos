import React from 'react';

import { ManualWishList } from './ManualWishlist';
import { RecommendedWishList } from '../../purchase-categories/RecommendedWishList';

export const Wishlist: React.FC = () => {
  return (
    <div className="shopping-list">
      <ManualWishList />
      <RecommendedWishList />
    </div>
  );
};
