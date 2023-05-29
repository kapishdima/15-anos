import { AppLayout, PageHeader, Tabs } from '@/components';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreatePurchase } from '../ui/buttons/CreatePurchase';
import { ShoppingList } from '../ui/purchase-list/ShoppingList';
import { useShoppingStore } from '../store/shopping';

export const PurchasesIndex: React.FC = () => {
  const { t } = useTranslation();

  const fetchProducts = useShoppingStore((state) => state.fetchProducts);
  const loading = useShoppingStore((state) => state.loading);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppLayout loading={loading}>
      <div className="home-page">
        <PageHeader
          title={t('Purchases')}
          actions={
            <>
              <CreatePurchase />
            </>
          }
        />

        <div className="tasks-info ">
          <Tabs
            tabs={[
              { title: 'Shopping List', component: <ShoppingList /> },
              { title: 'Wishlist', component: <ShoppingList /> },
            ]}
          />
        </div>
      </div>
    </AppLayout>
  );
};
