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

type PurchaseProductProps = {
  image: string;
  name: string;
  description: string;
  price?: string;
  popular?: boolean;
  specialOffer?: boolean;
  colors?: string[];
  canDelivery?: boolean;
  canReturn?: boolean;
};

export const PurchaseProduct: React.FC<PurchaseProductProps> = ({
  image,
  name,
  description,
  price,
  colors,
  popular,
  specialOffer,
  canDelivery,
  canReturn,
}) => {
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
                Popular choice
              </div>
            )}
          </div>
          <div className="purchase-label purchase-special">
            {specialOffer && (
              <div className="purchase-label__title">
                <PercentIcon />
                Special offer
              </div>
            )}
          </div>
        </div>
        <div className="purchase-label__hint">
          13 people have added this item to their shopping list
        </div>
        <div className="purchase-price">
          from {price}
          <div className="purchase-price__tooltip">
            <InfoIcon />
            <div className="purchase-price__tooltip-value">
              The final price depeneds on the order parameters and will be indicated on the seller's
              website
            </div>
          </div>
        </div>
        <h3 className="purchase-title">{name}</h3>
        <p className="purchase-description">{description}</p>

        {colors && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">Colors:</h4>
            <div className="purchase-colors">
              {colors.map((color) => (
                <div className="purchase-color" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        )}
        {canDelivery && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">Delivery:</h4>
            <div className="purchase-feature__value">
              <DeliveryIcon />
              Delivery available
            </div>
          </div>
        )}
        {canReturn && (
          <div className="purchase-feature">
            <h4 className="purchase-feature__label">Return:</h4>
            <div className="purchase-feature__value">
              <ReturnIcon />
              Return policy available
            </div>
          </div>
        )}
        <div className="purchase-actions">
          <Button>
            <FillHeartIcon />
            Add
          </Button>
          <Button variant="success">
            <ExternalLink />
            Go to Store
          </Button>
        </div>
      </div>
    </div>
  );
};
