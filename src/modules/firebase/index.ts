import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvCSVr97kPlAHyB55Md6qsKef1T28mlLw',
  authDomain: 'quinceanera-planner.firebaseapp.com',
  databaseURL: 'https://quinceanera-planner.firebaseio.com',
  projectId: 'quinceanera-planner',
  storageBucket: 'quinceanera-planner.appspot.com',
  messagingSenderId: '716866528333',
  appId: '1:716866528333:web:66398d8bfc9f913e026804',
  measurementId: 'G-4MBLZVJ6FK',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

setPersistence(auth, browserLocalPersistence);
export default app;
