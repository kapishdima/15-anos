import React from 'react';

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
} from '@/components';
import { useTranslation } from 'react-i18next';

type PurchaseProductProps = {
  image: string;
  name: string;
  description: string;
  price?: string;
  popular?: boolean;
  popularCount?: number;
  specialOffer?: boolean;
  colors?: string[];
  url?: string;
  canDelivery?: boolean;
  canReturn?: boolean;
  canTailor?: boolean;
};

export const PurchaseProduct: React.FC<PurchaseProductProps> = ({
  image,
  name,
  description,
  price,
  colors,
  popular,
  popularCount,
  specialOffer,
  url,
  canDelivery,
  canReturn,
  canTailor,
}) => {
  const { t } = useTranslation();

  return (
    <div className="purchase-product">
      <div className="purchase-image">
        <IconButton appearance="outline" classes="purchase-like" size="lg">
          <LikeIcon />
        </IconButton>
        <IconButton appearance="outline" classes="purchase-share" size="lg">
          <OutlineShareIcon />
        </IconButton>
        <img src={image} alt="Purchase" />
      </div>

      <div className="purchase-info">
        <div className="purchase-labels">
          <div className="purchase-label purchase-popular">
            {popular && (
              <div className="purchase-label__title">
                <PopularIcon />
                {t('Popular choice')}
              </div>
            )}
          </div>
          <div className="purchase-label purchase-special">
            {specialOffer && (
              <div className="purchase-label__title">
                <PercentIcon />
                {t('Special offer')}
              </div>
            )}
          </div>
        </div>
        <div className="purchase-label__hint">
          {popularCount} {t('added_to_shopping_list_2')}
        </div>
        {price && (
          <div className="purchase-price">
            {t('from')} {price}
            <div className="purchase-price__tooltip">
              <InfoIcon />
              <div className="purchase-price__tooltip-value">
                The final price depeneds on the order parameters and will be indicated on the
                seller's website
              </div>
            </div>
          </div>
        )}
        <h3 className="purchase-title">{name}</h3>
        <p className="purchase-description">{description}</p>

        {colors && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t('Colors')}:</h4>
            <div className="purchase-colors">
              {colors.map((color) => (
                <div className="purchase-color" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        )}
        {canTailor && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t('Sizes')}:</h4>
            <div className="purchase-feature__value">
              <DeliveryIcon />
              {t('Bespoke tailoring available')}
            </div>
          </div>
        )}
        {canDelivery && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t('Delivery')}:</h4>
            <div className="purchase-feature__value">
              <DeliveryIcon />
              {t('Delivery available')}
            </div>
          </div>
        )}
        {canReturn && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">{t('Return')}:</h4>
            <div className="purchase-feature__value">
              <ReturnIcon />
              {t('Return policy available')}
            </div>
          </div>
        )}
        <div className="purchase-actions">
          <Button>
            <FillHeartIcon />
            {t('Add')}
          </Button>
          {/* <Button variant="success">
            <ExternalLink />
            {t('Go to Store')}
          </Button> */}
          <a href={url} target="_blank" className="button success filled" rel="noreferrer">
            <ExternalLink />
            {t('Go to Store')}
          </a>
        </div>
      </div>
    </div>
  );
};
