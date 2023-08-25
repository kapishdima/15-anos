import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { IconButton, LikeIcon, PopularIcon } from "@/components";
import { translated } from "@/app/utils/locale";

import { ProductViewModal } from "../../store/purcheses.types";
import { useLike } from "../../hooks/useLike";
import { usePrice } from "../../hooks/usePriceConverter";

type ProductCardProps = {
  product: ProductViewModal;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, imageSmall, title, price, colors } = product;
  const { t } = useTranslation();

  const { symbol } = usePrice(price);

  const { likeProduct, disslikeProduct, liked, loading } = useLike(product);

  return (
    <div className="product-card">
      <div className="product-card__image">
        {/* {popular && (
          <div className="product-card__popular">
            <PopularIcon />
          </div>
        )} */}
        <img src={imageSmall || image} alt={translated(title)} />
      </div>
      <div className="product-card__footer">
        <div className="product-card__info">
          {price && (
            <div className="product-card__price">
              {t("from")} {price} {symbol}
            </div>
          )}
          <h4 className="product-card__name">{translated(title)}</h4>
          {colors && colors.length > 1 && (
            <div className="product-card__colors">
              {colors.map((color) => (
                <div
                  className="product-card__color"
                  style={{
                    backgroundColor: color,
                    border: color === "white" ? "1px solid #ccc" : "",
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
        <IconButton
          appearance="outline"
          loading={loading}
          loadingVariant="accent"
          classes={classNames("like-button", {
            liked,
          })}
          onClick={liked ? disslikeProduct : likeProduct}
        >
          <LikeIcon />
        </IconButton>
      </div>
    </div>
  );
};
