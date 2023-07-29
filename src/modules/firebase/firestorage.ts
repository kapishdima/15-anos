import { storage } from '@modules/firebase';
import { ref, uploadBytes } from 'firebase/storage';

export const upload = async (file: File) => {
  const fileName = new Date().getTime() + '_' + file.name;
  const imageRef = ref(storage, `images/${fileName}`);

  const uploadedFile = await uploadBytes(imageRef, file);

  console.log(uploadedFile);

  return uploadedFile.metadata.fullPath;
};
