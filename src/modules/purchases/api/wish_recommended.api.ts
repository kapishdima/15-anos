import { Collections } from '@app/constants/collections';
import { getSnapshotCollection } from '@modules/firebase/firestore';

import { ProductsCategory } from '../store/purcheses.types';

export const getRecommendedWishList = async (): Promise<ProductsCategory[]> => {
  const wishList = await getSnapshotCollection<ProductsCategory[]>(
    Collections.RECOMMENDED_WISH_LIST,
  );

  return wishList || [];
};
