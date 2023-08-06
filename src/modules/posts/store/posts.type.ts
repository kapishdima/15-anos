import { Translated } from "@/app/utils/locale";

export type Post = {
  id: string;
  description: string | Translated;
  image: string;
  imageSmall: string;
  popularity: number;
  tagId: string;
  title: string | Translated;
  text: string;
  url: string;
};

export type PostCategory = {
  color: string;
  number: string;
  tagId: string;
  title: string;
};

export type LikedPost = {
  initialId: string;
};
