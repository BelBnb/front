import { Paginator } from "../../pagination/paginator";

export type userBookings = {
  id: string;
  hotelId: string;
  userId: string;
  wannaNeighbour: boolean;
  startDate: string;
  endDate: string;
};

export type userBookingPayload = Paginator<userBookings[]>;
