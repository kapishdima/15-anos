import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  AspectRatio,
  IconButton,
  Image,
  LikeIcon,
  PopularIcon,
} from "@/components";
import { translated } from "@/app/utils/locale";

import { ProductViewModal } from "../../store/purcheses.types";
import { useLike } from "../../hooks/useLike";
import { usePrice } from "../../hooks/usePriceConverter";
import { usePopular } from "../../hooks/usePopulary";
import { Protected, RoleActions } from "@/modules/roles";

type ProductCardProps = {
  product: ProductViewModal;
  ratio?: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  ratio = 1,
}) => {
  const { image, title, price, colors } = product;
  const { t } = useTranslation();

  const { symbol, convertedPrice } = usePrice(price);
  const { likeProduct, disslikeProduct, liked, loading } = useLike(product);
  const popular = usePopular(product["0-favourites"]);

  return (
    <div className="product-card">
      <div className="product-card__image">
        {popular && (
          <div className="product-card__popular">
            <PopularIcon />
          </div>
        )}
        <Image
          src={image}
          alt={translated(title)}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="product-card__footer">
        <div className="product-card__info">
          {price && (
            <div className="product-card__price">
              {t("from")} {symbol}
              {convertedPrice}
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
        <Protected action={RoleActions.LIKE_PURCHASE}>
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
        </Protected>
      </div>
    </div>
  );
};
