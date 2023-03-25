import { getAuth, signInAnonymously } from 'firebase/auth';

export const authAnonymously = async () => {
  try {
    const auth = getAuth();
    await signInAnonymously(auth);
  } catch (error) {
    console.log(error);
  }
};
