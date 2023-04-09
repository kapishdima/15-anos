import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './index';

export function getSnapshot<TData = any>(key: string, params: string[] = []) {
  const ref = collection(db, key, ...params);

  return new Promise<TData>((resolve, reject) => {
    onSnapshot(
      ref,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data()) as TData;
        return resolve(docs);
      },
      (error) => {
        return reject(error);
      },
    );
  });
}
