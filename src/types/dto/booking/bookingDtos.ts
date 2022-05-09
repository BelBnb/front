export interface createBookingDto {
  userId: string;
  hotelId: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface userBookingsDto {
  userId: string;
  dateFilter: string;
  limit: number;
  offset: number;
}
