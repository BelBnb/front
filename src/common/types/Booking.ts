export class BookingEntityFilled {
  userId!: string;
  hotelId!: string;
  startDate!: Date;
  endDate!: Date;
  isActive!: boolean;
  id!: string;

  userImage: string;
  userFirstName: string;
  userLastName: string;

  hotelImage: string;
  hotelName: string;

  // username will be calculated on necessary
  name?: string;
}
