import React, { useEffect } from 'react';
import { ListTitle, Slider } from '@/components';
import { PurchaseCategoryCard } from './PurchaseCategoryCard';

import { useRecommendedShoppingStore } from '../../store/shopping_recommended';
import { useTranslation } from 'react-i18next';

export const RecommendedShoppingList: React.FC = () => {
  const { t } = useTranslation();
  const fetchRecommendedShoppingList = useRecommendedShoppingStore(
    (state) => state.fetchRecommendedShoppingList,
  );
  const shoppingProducts = useRecommendedShoppingStore((state) => state.products);

  useEffect(() => {
    fetchRecommendedShoppingList();
  }, []);

  return (
    <div className="purchase-categories-list">
      <ListTitle>{t('Best ideas')}</ListTitle>
      <Slider
        slidesPerView={2}
        spaceBetween={10}
        autoHeight
        breakpoints={{ 768: { slidesPerView: 3 } }}>
        {shoppingProducts.map((shoppingProduct) => (
          <PurchaseCategoryCard
            id={shoppingProduct.id}
            image={shoppingProduct.image}
            name={shoppingProduct.title.en}
            type="shopping"
          />
        ))}
      </Slider>
    </div>
  );
};
