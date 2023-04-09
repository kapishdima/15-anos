import { Collections } from '../../../app/constants/collections';
import { getSnapshot } from '../../firebase/firestore';
import { Category } from '../store/categories';

export const getCategories = async (eventId: string) => {
  const categories = await getSnapshot<Category[]>(Collections.EVENTS, [
    eventId,
    Collections.CATEGORIES,
  ]);

  return categories;
};
