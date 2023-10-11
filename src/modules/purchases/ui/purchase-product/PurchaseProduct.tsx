import React from "react";

import {
  IconButton,
  LikeIcon,
  OutlineShareIcon,
  PopularIcon,
  Button,
  FillHeartIcon,
  ExternalLink,
  PercentIcon,
  DeliveryIcon,
  ReturnIcon,
  InfoIcon,
} from "@/components";
import { useTranslation } from "react-i18next";
import { PurchaseImageSlider } from "./PurchaseImageSlider";
import { useLike } from "../../hooks/useLike";
import { ProductViewModal } from "../../store/purcheses.types";
import { translated } from "@/app/utils/locale";
import classNames from "classnames";
import { usePrice } from "../../hooks/usePriceConverter";
import { usePopular } from "../../hooks/usePopulary";

type PurchaseProductProps = {
  product: ProductViewModal;
  onLikeClick?: () => void;
};

export const PurchaseProduct: React.FC<PurchaseProductProps> = ({
  product,
}) => {
  const {
    image,
    images,
    title,
    description,
    price,
    colors,
    "0-favourites": popularCount,
    offer,
    url,
    delivery: canDelivery,
    returns: canReturn,
    tailor: canTailor,
  } = product;
  const { t } = useTranslation();

  const { symbol, convertedPrice } = usePrice(price);
  const { likeProduct, disslikeProduct, liked, loading } = useLike(product);
  const popular = usePopular(popularCount);

  return (
    <div className="purchase-product">
      <div className="purchase-image">
        <div className="purchase-actions">
          <IconButton
            loading={loading}
            loadingVariant="accent"
            appearance="outline"
            classes={classNames("purchase-like", {
              liked,
            })}
            size="lg"
            onClick={liked ? disslikeProduct : likeProduct}
          >
            <LikeIcon />
          </IconButton>
          <IconButton appearance="outline" classes="purchase-share" size="lg">
            <OutlineShareIcon />
          </IconButton>
        </div>

        {images ? (
          <PurchaseImageSlider images={images} />
        ) : (
          <img src={image} alt="Purchase" />
        )}
      </div>

      <div className="purchase-info">
        <div className="purchase-labels">
          <div className="purchase-label purchase-popular">
            {popular && (
              <div className="purchase-label__title">
                <PopularIcon />
                {t("Popular choice")}
              </div>
            )}
          </div>
          <div className="purchase-label purchase-special">
            {offer && (
              <div className="purchase-label__title">
                <PercentIcon />
                {t("Special offer")}
              </div>
            )}
          </div>
        </div>
        <div className="purchase-label__hint">
          {popularCount} {t("added_to_shopping_list_2")}
        </div>
        {price && (
          <div className="purchase-price">
            {t("from")} {convertedPrice} {symbol}
            <div className="purchase-price__tooltip">
              <InfoIcon />
              <div className="purchase-price__tooltip-value">
                The final price depeneds on the order parameters and will be
                indicated on the seller's website
              </div>
            </div>
          </div>
        )}
        <h3 className="purchase-title">{translated(title)}</h3>
        <p className="purchase-description">{translated(description)}</p>

        {colors && colors.length > 1 && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t("Colors")}:</h4>
            <div className="purchase-colors">
              {colors.map((color) => (
                <div
                  className="purchase-color"
                  style={{
                    backgroundColor: color,
                    border: color === "white" ? "1px solid #ccc" : "",
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
        {canTailor && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t("Sizes")}:</h4>
            <div className="purchase-feature__value">
              <DeliveryIcon />
              {t("Bespoke tailoring available")}
            </div>
          </div>
        )}
        {canDelivery && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t("Delivery")}:</h4>
            <div className="purchase-feature__value">
              <DeliveryIcon />
              {t("Delivery available")}
            </div>
          </div>
        )}
        {canReturn && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t("Return")}:</h4>
            <div className="purchase-feature__value">
              <ReturnIcon />
              {t("Return policy available")}
            </div>
          </div>
        )}
        <div className="purchase-actions">
          <Button>
            <FillHeartIcon />
            {t("Add")}
          </Button>
          <a
            href={url}
            target="_blank"
            className="button success filled"
            rel="noreferrer"
          >
            <ExternalLink />
            {t("Go to Store")}
          </a>
        </div>
      </div>
    </div>
  );
};
