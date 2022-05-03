import { Paginator } from "../pagination/paginator";
import { Location } from "./createHotelPayload";

export type getHotelPayload = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  authorId: string;
  city: string;
  location: Location;
};

export type getAllHotelsPayload = Paginator<getHotelPayload>;
