import { getEventId } from '@/modules/event';
import { Collections } from '../../../app/constants/collections';
import { getSnapshotCollection } from '../../firebase/firestore';
import { Category } from '../store/categories';

export const getCategories = async () => {
  const eventId = getEventId();
  const categories = await getSnapshotCollection<Category[]>(Collections.EVENTS, [
    eventId,
    Collections.CATEGORIES,
  ]);

  return categories;
};
