import React, { useEffect } from 'react';
import { ListTitle, Slider } from '@/components';
import { PurchaseCategoryCard } from './PurchaseCategoryCard';

import { useRecommendedWishStore } from '../../store/wish_recommended';
import { useTranslation } from 'react-i18next';

export const RecommendedWishList: React.FC = () => {
  const { t } = useTranslation();
  const fetchRecommendedWishList = useRecommendedWishStore(
    (state) => state.fetchRecommendedWishList,
  );
  const wishProducts = useRecommendedWishStore((state) => state.products);

  useEffect(() => {
    fetchRecommendedWishList();
  }, []);

  return (
    <div className="purchase-categories-list">
      <ListTitle>{t('Best ideas')}</ListTitle>
      <Slider
        slidesPerView={2}
        spaceBetween={10}
        autoHeight
        breakpoints={{ 768: { slidesPerView: 3 } }}>
        {wishProducts.map((shoppingProduct) => (
          <PurchaseCategoryCard
            id={shoppingProduct.id}
            image={shoppingProduct.image}
            name={shoppingProduct.title.en}
            type="registry"
          />
        ))}
      </Slider>
    </div>
  );
};
