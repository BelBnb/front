export type createHotelDto = {
  name: string;
  description: string;
  images: File[];
  authorId: string;
  city: string;
  long: number;
  lat: number;
  price: number;
};
