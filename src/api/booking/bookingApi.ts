import { createBookingDto } from "@/types/dto/booking/bookingDtos";
import { requestWithBody } from "../apiService";
import { createBookingRoute, methods } from "../constants";

const createBooking = async (dto: createBookingDto) => {
  const result = await requestWithBody(createBookingRoute, methods.POST, dto);

  return result.json();
};

export default { createBooking };
