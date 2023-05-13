import { IconButton, LikeIcon, PopularIcon } from '@/components';
import classNames from 'classnames';
import React, { useState } from 'react';

type ProductCardProps = {
  image: string;
  name: string;
  liked?: boolean;
  popular?: boolean;
  price?: string;
  colors?: string[];
};

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  liked,
  popular,
  price,
  colors,
}) => {
  const [like, setLike] = useState(liked);

  return (
    <div className="product-card">
      <div className="product-card__image">
        {popular && (
          <div className="product-card__popular">
            <PopularIcon />
          </div>
        )}
        <img src={image} alt={name} />
      </div>
      <div className="product-card__footer">
        <div className="product-card__info">
          {price && <div className="product-card__price">from {price}</div>}
          <h4 className="product-card__name">{name}</h4>
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
          classes={classNames('like-button', { liked: like })}
          onClick={() => setLike((_like) => !_like)}>
          <LikeIcon />
        </IconButton>
      </div>
    </div>
  );
};
