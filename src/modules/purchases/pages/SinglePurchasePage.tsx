import React from 'react';

import { AppLayout, PageHeader } from '@/components';
import { PurchaseProduct } from '../ui/purchase-product/PurchaseProduct';

import MockDress from '@/image/mock-dress.png';

export const SinglePurchasePage: React.FC = () => {
  return (
    <AppLayout fullWidth>
      <PageHeader hasBackButton />
      <PurchaseProduct
        image={MockDress}
        name="Long shiffon dress"
        description="High Quality Chiffon & Iace. The upper part of the dress is Iace, Chiffon above the waist. V-neck, Sleeveless, Zipper closure"
        popular
      />
    </AppLayout>
  );
};
