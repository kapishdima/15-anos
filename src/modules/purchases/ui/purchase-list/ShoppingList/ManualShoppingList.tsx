import React, { useEffect } from 'react';

import { ListTitle, Slider } from '@/components';
import { CreatePurchase } from '../../buttons/CreatePurchase';
import { useManualShoppingStore } from '@/modules/purchases/store/manual_shopping_list';
import { ProductManualCard } from '../ProductManualCard';
import { useTranslation } from 'react-i18next';

export const ManualShopingList: React.FC = () => {
  const { t } = useTranslation();
  const fetchManualShoppingList = useManualShoppingStore((state) => state.fetchManualShoppingList);
  const products = useManualShoppingStore((state) => state.products);

  useEffect(() => {
    fetchManualShoppingList();
  }, []);

  return (
    <div className="manual-shopping-list">
      <ListTitle>{t('My shopping list')}</ListTitle>
      {!products.length ? (
        <div className="empty-list">
          <h4 className="empty-list__title">
            {t('Your shopping list is empty now.')} <br />
            {t('Add new items to it from Best Ideas or manually.')}
          </h4>
          <CreatePurchase as="button" />
        </div>
      ) : (
        <div className="products-list">
          <Slider
            slidesPerView={3}
            spaceBetween={10}
            breakpoints={{ 768: { slidesPerView: 3 } }}
            className="products-list">
            {products.map((product) => (
              <ProductManualCard product={product} />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
