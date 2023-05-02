import React from 'react';

import MockDress from '@/image/mock-dress.png';
import {
  AppLayout,
  Button,
  ExternalLink,
  FillHeartIcon,
  IconButton,
  LikeIcon,
  PageHeader,
  PopularIcon,
  OutlineShareIcon,
} from '@/components';

export const SinglePurchasePage: React.FC = () => {
  return (
    <AppLayout>
      <PageHeader hasBackButton />
      <div className="single-purchase-page">
        <div className="purchase-image">
          <IconButton appearance="outline" classes="purchase-like" size="lg">
            <LikeIcon />
          </IconButton>
          <IconButton appearance="outline" classes="purchase-share" size="lg">
            <OutlineShareIcon />
          </IconButton>
          <img src={MockDress} alt="Purchase" />
        </div>

        <div className="purchase-info">
          <div className="purchase-popular">
            <div className="purchase-popular__title">
              <PopularIcon />
              Popular choice
            </div>
            <div className="purchase-popular__hint">
              13 people have added this item to their shopping list
            </div>
          </div>
          <h3 className="purchase-title">Long chiffon dress</h3>
          <p className="purchase-description">
            High quality Chiffon & Iace. The upper part of the dress is Iace, Chiffon above the
            waise. V-neck, Sleeveless, Zipper clousere
          </p>
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
    </AppLayout>
  );
};
