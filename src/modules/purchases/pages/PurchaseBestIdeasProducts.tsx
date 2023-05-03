import React from 'react';
import { AppLayout, PageBanner, PageHeader, PageHint } from '@/components';
import { useTranslation } from 'react-i18next';

import { ProductsList } from '../ui/purchase-list/ProductsList';

import MockPageBanner from '@/image/mock-purchase.jpg';
import MockDress from '@/image/mock-dress.png';

const products = Array(20)
  .fill(0)
  .map((_, index) => ({
    image: MockDress,
    name: 'Long chiffon dress',
    popular: index % 2 === 0,
    price: '$33',
    colors: ['#db5b78', '#e74c3c', '#2ecc71'],
  }));

export const PurchaseBestIdeasProducts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="best-ideas">
        <PageHeader title={t('Best ideas')} hasBackButton />
        <PageBanner image={MockPageBanner} title="Centerpieces" />
        <PageHint>
          Here you find the best offers selected by professionals. High qualit, low prices and an
          opportunity to order delivery
        </PageHint>

        <ProductsList products={products} type="products" />
      </div>
    </AppLayout>
  );
};
