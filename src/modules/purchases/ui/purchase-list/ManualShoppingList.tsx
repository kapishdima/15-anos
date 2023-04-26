import { Button, ListTitle } from '@/components';
import React from 'react';

export const ManualShopingList: React.FC = () => {
  return (
    <div className="manual-shopping-list">
      <ListTitle>My shopping list</ListTitle>
      <div className="empty-list">
        <h4 className="empty-list__title">
          Your shopping list is empty now. <br />
          Add new items to it from Best Ideas or manually
        </h4>
        <Button appearance="ghost" variant="text">
          Add manually
        </Button>
      </div>
    </div>
  );
};
