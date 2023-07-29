import React from 'react';
import { RecommendedShoppingList } from '../../purchase-categories/RecommendedShoppingList';
import { ManualShopingList } from './ManualShoppingList';

export const ShoppingList: React.FC = () => {
  return (
    <div className="shopping-list">
      <ManualShopingList />
      <RecommendedShoppingList />
    </div>
  );
};
