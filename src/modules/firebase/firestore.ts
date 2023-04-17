import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './index';

export function getSnapshot<TData = any>(key: string, params: string[] = []) {
  const ref = collection(db, key, ...params);

  return new Promise<TData>((resolve, reject) => {
    onSnapshot(
      ref,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as TData;
        return resolve(docs);
      },
      (error) => {
        return reject(error);
      },
    );
  });
}

export const deleteDocument = async (key: string, params: string[] = []) => {
  const document = doc(db, key, ...params);
  await deleteDoc(document);
};

export const updateDocument = async (key: string, params: string[] = [], payload: any) => {
  const document = doc(db, key, ...params);
  return await updateDoc(document, payload);
};

export const pushData = async (key: string, params: string[] = [], payload: any) => {
  const document = doc(db, key, ...params);
  return setDoc(document, payload);
};

export const toDate = (date: any) => {
  if (!date) {
    return Date.now();
  }

  if (date instanceof Date) {
    return date;
  }

  return new Timestamp(date.seconds, date.nanoseconds).toDate();
};

export const fromDate = (date: any) => {
  return Timestamp.fromDate(date).toJSON();
};
