import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./index";

export function getSnapshotCollection<TData = any>(
  key: string,
  params: string[] = [],
  queries: any = []
) {
  const ref = query(collection(db, key, ...params), ...queries);

  return new Promise<TData>((resolve, reject) => {
    try {
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
        }
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function getSnapshotDocument<TData = any>(
  key: string,
  params: string[] = []
) {
  const ref = doc(db, key, ...params);

  return new Promise<TData | null>((resolve, reject) => {
    try {
      onSnapshot(
        ref,
        (snapshot) => {
          if (!snapshot.exists()) {
            return resolve(null);
          }
          const docs = {
            id: snapshot.id,
            ...snapshot.data(),
          } as TData;

          return resolve(docs);
        },
        (error) => {
          return reject(error);
        }
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export const deleteDocument = async (key: string, params: string[] = []) => {
  const document = doc(db, key, ...params);
  await deleteDoc(document);
};

export const updateDocument = async (
  key: string,
  params: string[] = [],
  payload: any
) => {
  const document = doc(db, key, ...params);
  return await updateDoc(document, payload);
};

export const pushData = async (
  key: string,
  params: string[] = [],
  payload: any
) => {
  const document = doc(db, key, ...params);
  return setDoc(document, payload);
};

export const createDocumentWithAutoID = async (
  key: string,
  params: string[] = [],
  payload: any
) => {
  const collectionRef = collection(db, key, ...params);
  return addDoc(collectionRef, payload);
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
