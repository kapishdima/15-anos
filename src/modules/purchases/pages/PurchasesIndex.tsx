import { AppLayout, PageHeader, Tabs } from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreatePurchase } from '../ui/buttons/CreatePurchase';
import { ShoppingList } from '../ui/purchase-list/ShoppingList';

export const PurchasesIndex: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
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
