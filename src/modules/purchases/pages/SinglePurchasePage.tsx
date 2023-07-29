import React from 'react';

import { AppLayout, PageHeader } from '@/components';
import { PurchaseProduct } from '../ui/purchase-product/PurchaseProduct';

import { useProductsStore } from '../store/products';

export const SinglePurchasePage: React.FC = () => {
  const getProduct = useProductsStore((state) => state.getProduct);

  const product = getProduct();

  return (
    <AppLayout fullWidth>
      <PageHeader hasBackButton />
      <PurchaseProduct
        image={product.image}
        name={product.title.en}
        description={product.description.en}
        colors={product.colors}
        price={product.price?.toString()}
        popular
        url={product.url}
        popularCount={product.popularity}
        specialOffer={product.offer}
        canDelivery={product.delivery}
        canReturn={product.returns}
        canTailor={product.tailor}
      />
    </AppLayout>
  );
};
