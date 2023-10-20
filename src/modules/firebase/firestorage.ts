import { storage } from "@/modules/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getEventId } from "../event";
import { Collections } from "@/app/constants/collections";

export const upload = async (
  collection: string,
  filename: string,
  file: File
) => {
  const eventId = getEventId();

  const imageRef = ref(
    storage,
    `${Collections.EVENTS}/${eventId}/${collection}/${filename}`
  );

  const uploadedFile = await uploadBytes(imageRef, file);

  return getDownloadURL(uploadedFile.ref);
};
