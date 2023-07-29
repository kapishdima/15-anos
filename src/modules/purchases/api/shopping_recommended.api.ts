import { Collections } from '@app/constants/collections';
import { getSnapshotCollection } from '@modules/firebase/firestore';

import { ProductsCategory } from '../store/purcheses.types';

export const getRecommendedShoppingList = async (): Promise<ProductsCategory[]> => {
  const shoppingList = await getSnapshotCollection<ProductsCategory[]>(
    Collections.RECOMMENDED_SHOPING_LIST,
  );

  return shoppingList || [];
};
