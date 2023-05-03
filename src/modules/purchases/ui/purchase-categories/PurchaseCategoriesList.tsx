import { ListTitle, Slider } from '@/components';
import React from 'react';
import { PurchaseCategoryCard } from './PurchaseCategoryCard';

import MockDressImage from '@/image/mock-purchase.jpg';
import MockCenterPiecesImage from '@/image/mock-centerpieces.jpg';
import MockFootwearImage from '@/image/mock-footwear.jpg';
import MockBouquetsImage from '@/image/mock-bouquets.jpg';
import MockHairImage from '@/image/mock-hair.jpg';

export const PurchaseCategoriesList: React.FC = () => {
  return (
    <div className="purchase-categories-list">
      <ListTitle>Best Ideas</ListTitle>
      <Slider slidesPerView={3} spaceBetween={10}>
        <PurchaseCategoryCard id="ideas" image={MockDressImage} name="Dress for bridesmaids" />
        <PurchaseCategoryCard id="products" image={MockCenterPiecesImage} name="Centerpieces" />
        <PurchaseCategoryCard id="ideas" image={MockFootwearImage} name="Comfortable footwear" />
        <PurchaseCategoryCard id="products" image={MockBouquetsImage} name="Bouquets" />
        <PurchaseCategoryCard id="ideas" image={MockHairImage} name="Hair ornaments" />
      </Slider>
    </div>
  );
};
