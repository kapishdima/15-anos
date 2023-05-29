import { Button, ListTitle } from '@/components';
import React from 'react';
import { useShoppingStore } from '../../store/shopping';

export const ManualShopingList: React.FC = () => {
  const products = useShoppingStore((state) => state.products);

  console.log(products);

  return (
    <div className="manual-shopping-list">
      <ListTitle>My shopping list</ListTitle>
      {!products.length ? (
        <div className="empty-list">
          <h4 className="empty-list__title">
            Your shopping list is empty now. <br />
            Add new items to it from Best Ideas or manually
          </h4>
          <Button appearance="ghost" variant="text">
            Add manually
          </Button>
        </div>
      ) : (
        <div className="products-list">
          {products.map((product) => (
            <div className="product-item">
              <div className="product-item__image">
                <img src={product.imageSmall} alt="" />
              </div>
              <div className="product-item__name">{product.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
