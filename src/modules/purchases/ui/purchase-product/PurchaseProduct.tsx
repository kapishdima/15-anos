import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { translated } from "@/app/utils/locale";

import {
  IconButton,
  LikeIcon,
  OutlineShareIcon,
  PopularIcon,
  Button,
  FillHeartIcon,
  ExternalLink,
  PercentIcon,
  InfoIcon,
} from "@/components";
import { PurchaseImageSlider } from "./PurchaseImageSlider";
import { useLike } from "../../hooks/useLike";
import { ProductViewModal } from "../../store/purcheses.types";
import { usePrice } from "../../hooks/usePriceConverter";
import { usePopular } from "../../hooks/usePopulary";

import TailorIcon from "@image/icons/tailor.png";
import DeliveryIcon from "@image/icons/delivery.png";
import ReturnIcon from "@image/icons/return.png";
import { Protected, RoleActions } from "@/modules/roles";

type PurchaseProductProps = {
  ratio: number;
  product: ProductViewModal;
  onLikeClick?: () => void;
};

export const PurchaseProduct: React.FC<PurchaseProductProps> = ({
  product,
  ratio,
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

  const hasManyImages = Boolean(
    images?.filter((image) => Boolean(image.length)).length
  );

  return (
    <div className="purchase-product">
      <div className="purchase-image">
        <div className="purchase-actions">
          <Protected action={RoleActions.LIKE_PURCHASE}>
            <IconButton
              loading={loading}
              loadingVariant="accent"
              appearance="filled"
              classes={classNames("purchase-like", {
                liked,
              })}
              size="lg"
              onClick={liked ? disslikeProduct : likeProduct}
            >
              <LikeIcon />
            </IconButton>
          </Protected>
        </div>

        {hasManyImages ? (
          <PurchaseImageSlider images={images} ratio={ratio} />
        ) : (
          <div style={{ display: "flex" }}>
            <img
              src={image}
              alt="Purchase"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>

      <div className="purchase-info">
        <h3 className="purchase-title">{translated(title)}</h3>
        {price && (
          <div className="purchase-price">
            {t("from")} {symbol}
            {convertedPrice}
            <div className="purchase-price__tooltip">
              <InfoIcon />
              <div className="purchase-price__tooltip-value">
                The final price depeneds on the order parameters and will be
                indicated on the seller's website
              </div>
            </div>
          </div>
        )}
        <div className="purchase-label purchase-special">
          {offer && (
            <div className="purchase-label__title">
              <PercentIcon />
              {t("Special offer")}
            </div>
          )}
        </div>
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
              <img src={TailorIcon} alt="" />
              {t("Bespoke tailoring available")}
            </div>
          </div>
        )}
        {canDelivery && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t("Delivery")}:</h4>
            <div className="purchase-feature__value">
              <img src={DeliveryIcon} alt="" />

              {t("Delivery available")}
            </div>
          </div>
        )}
        {canReturn && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t("Return")}:</h4>
            <div className="purchase-feature__value">
              <img src={ReturnIcon} alt="" />
              {t("Return policy available")}
            </div>
          </div>
        )}
        <div className="purchase-label purchase-popular">
          {popular && (
            <div className="purchase-label__title">
              <PopularIcon />
              {t("Popular choice")}
            </div>
          )}
        </div>
        <div className="purchase-label__hint">
          {popularCount} {t("added_to_shopping_list_2")}
        </div>
        <div className="purchase-actions">
          <Protected action={RoleActions.LIKE_PURCHASE}>
            <Button>
              <FillHeartIcon />
              {t("Add")}
            </Button>
          </Protected>
          <a
            href={url}
            target="_blank"
            className="button success filled"
            rel="noreferrer"
          >
            <ExternalLink />
            {t("Go to Store")}
          </a>
          <Button variant="success">
            <OutlineShareIcon />
            {t("Share")}
          </Button>
        </div>
      </div>
    </div>
  );
};
