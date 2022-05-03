export interface Location {
  type: string;
  coordinates: number[];
}

export type CreateHotelPayload = {
  name: string;
  description: string;
  authorId: string;
  city: string;
  long: number;
  lat: number;
  price: number;
  images: string[];
  location: Location;
  id: string;
};
