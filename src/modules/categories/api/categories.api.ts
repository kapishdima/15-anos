import { Collections } from '../../../app/constants/collections';
import { getSnapshotCollection } from '../../firebase/firestore';
import { Category } from '../store/categories';

export const getCategories = async (eventId: string) => {
  const categories = await getSnapshotCollection<Category[]>(Collections.EVENTS, [
    eventId,
    Collections.CATEGORIES,
  ]);

  return categories;
};
