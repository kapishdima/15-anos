import React, { useState } from 'react';
import classNames from 'classnames';

import { IconButton, LikeIcon, PopularIcon } from '@/components';
import { ProductTypes, ProductViewModal } from '../../store/purcheses.types';
import { useProductsStore } from '../../store/products';
import { useSearchParams } from 'react-router-dom';
import { useManualShoppingStore } from '../../store/manual_shopping_list';
import { useManualWishList } from '../../store/manual_wish_list';
import { isLikedProduct } from '../../store/shopping.selector';

type ProductCardProps = {
  product: ProductViewModal;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, imageSmall, title, price, colors } = product;

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as ProductTypes;
  const addProduct = useProductsStore((state) => state.addProduct);

  const fetchManualShoppingList = useManualShoppingStore((state) => state.fetchManualShoppingList);
  const fetchManualWishList = useManualWishList((state) => state.fetchManualWishList);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);

  const isShoppingSelected = useManualShoppingStore((state) => isLikedProduct(product.id, state));
  const isWishSelected = useManualWishList((state) => isLikedProduct(product.id, state));

  const liked = type === 'registry' ? isWishSelected : isShoppingSelected;

  const likeProduct = async () => {
    await addProduct(type, product);
    fetchManualShoppingList(/*force*/ true);
    fetchManualWishList(/*force*/ true);
  };

  const disslikeProduct = async () => {
    await deleteProduct(type, product.id);
    fetchManualShoppingList(/*force*/ true);
    fetchManualWishList(/*force*/ true);
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        {/* {popular && (
          <div className="product-card__popular">
            <PopularIcon />
          </div>
        )} */}
        <img src={imageSmall || image} alt={title.en} />
      </div>
      <div className="product-card__footer">
        <div className="product-card__info">
          {price && <div className="product-card__price">from {price}</div>}
          <h4 className="product-card__name">{title.en}</h4>
          {colors && (
            <div className="product-card__colors">
              {colors.map((color) => (
                <div className="product-card__color" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          )}
        </div>
        <IconButton
          appearance="outline"
          classes={classNames('like-button', {
            liked,
          })}
          onClick={liked ? disslikeProduct : likeProduct}>
          <LikeIcon />
        </IconButton>
      </div>
    </div>
  );
};
