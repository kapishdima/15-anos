import React from 'react';

import { AppLayout, PageHeader } from '@/components';
import { PurchaseProduct } from '../ui/purchase-product/PurchaseProduct';

import MockDress from '@/image/mock-dress.png';

export const SinglePurchasePageProduct: React.FC = () => {
  return (
    <AppLayout>
      <PageHeader hasBackButton />
      <PurchaseProduct
        image={MockDress}
        name="Long shiffon dress"
        description="High Quality Chiffon & Iace. The upper part of the dress is Iace, Chiffon above the waist. V-neck, Sleeveless, Zipper closure"
        colors={['#db5b78', '#e74c3c', '#2ecc71']}
        price="$33"
        popular
        specialOffer
        canDelivery
        canReturn
      />
    </AppLayout>
  );
};
