import { Translated } from "@/app/utils/locale";

export type SearchedVendor = {
  id: string;
  categoryId: string;
  contacts: any;
  description: Translated;
  image: string;
  latitude: number;
  longitude: number;
  title: Translated;
};

export type Category = {
  id: string;
  categoryId: string;
  image: string;
  number: number;
  title: Translated;
};
