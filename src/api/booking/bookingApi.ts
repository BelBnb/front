import { userBookingPayload } from "@/types/dto/apiPayloads/booking/userBookingsPayload";
import { createBookingDto, userBookingsDto } from "@/types/dto/booking/bookingDtos";
import { requestWithBody, requestWithQuerry } from "../apiService";
import { createBookingRoute, methods, userBookingsRoute } from "../constants";

const createBooking = async (dto: createBookingDto) => {
  const result = await requestWithBody(createBookingRoute, methods.POST, dto);

  return result.json();
};

const userBooking = async (dto: userBookingsDto): Promise<userBookingPayload> => {
  const result = await requestWithQuerry(userBookingsRoute, methods.GET, { ...dto });

  return result.json();
};

export default { createBooking, userBooking };
