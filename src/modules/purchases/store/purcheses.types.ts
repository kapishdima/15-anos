import { Timestamp } from "firebase/firestore";

export type Product = {
  "0-favourites": number;
  "0-purchased": number;
  "0-views": number;
  "0-visits": number;
  id: string;
  favourites: number;
  views: number;
  visits: number;
  purchased: number;
  addedDate: Timestamp;
  colors: string[];
  delivery: boolean;
  offer: boolean;
  returns: boolean;
  tailor: boolean;
  description: string | any;
  group: string;
  image: string;
  imageSmall: string;
  images: string[];
  initialDescription: string;
  initialId: string;
  initialTitle: string;
  market: string[];
  number: number;
  popularity: number;
  price: number;
  ratio: string;
  title: string | any;
  url: string;
};

export type ProductViewModal = Product & {
  addedData: Date;
};

export type ProductsCategory = {
  id: string;
  colors: string[];
  image: string;
  imageHeader: string;
  number: number;
  popularity: number;
  price: boolean;
  prices: any;
  ratio: number;
  title: any;
};

export type ProductsParameters = {
  colors: string[];
  popularChoice: number;
  rates: any;
  updates: any;
};

export type ProductTypes = "shopping" | "registry";
