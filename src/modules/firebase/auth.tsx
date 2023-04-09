import { signInAnonymously, signOut } from 'firebase/auth';
import { auth } from './index';

export const authAnonymously = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.log(error);
  }
};

export const forceRefreshUser = async () => {
  if (!auth.currentUser) {
    return false;
  }

  await auth.currentUser.getIdToken(true);
  // await auth.currentUser.getIdTokenResult(true);

  return true;
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const isAuthorized = async () => {
  return Boolean(auth.currentUser);
};
