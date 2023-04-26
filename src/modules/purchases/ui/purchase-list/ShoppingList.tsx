import React from 'react';
import { PurchaseCategoriesList } from '../purchase-categories/PurchaseCategoriesList';
import { ManualShopingList } from './ManualShoppingList';

export const ShoppingList: React.FC = () => {
  return (
    <div className="shopping-list">
      <ManualShopingList />
      <PurchaseCategoriesList />
    </div>
  );
};
