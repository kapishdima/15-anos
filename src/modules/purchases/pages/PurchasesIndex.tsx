import React, { useEffect } from 'react';

import { AppLayout, PageHeader, Tabs } from '@/components';
import { useTranslation } from 'react-i18next';
import { CreatePurchase } from '../ui/buttons/CreatePurchase';

import { ShoppingList } from '../ui/purchase-list/ShoppingList/ShoppingList';
import { Wishlist } from '../ui/purchase-list/Wishlist/Wishlist';

import { useProductParameters } from '../store/products_parameters';

export const PurchasesIndex: React.FC = () => {
  const { t } = useTranslation();

  const fetchProductsParameters = useProductParameters((state) => state.fetchProductsParameters);

  useEffect(() => {
    fetchProductsParameters();
  }, []);

  return (
    <AppLayout loading={false}>
      <div className="home-page">
        <PageHeader
          title={t('Purchases')}
          actions={
            <>
              <CreatePurchase />
            </>
          }
        />

        <Tabs
          tabs={[
            { title: t('Shopping list'), component: <ShoppingList /> },
            { title: t('Wishlist'), component: <Wishlist /> },
          ]}
        />
      </div>
    </AppLayout>
  );
};
