import { userBookingPayload } from "@/types/dto/apiPayloads/booking/userBookingsPayload";
import { createBookingDto, userBookingsDto } from "@/types/dto/booking/bookingDtos";
import { requestWithBody, requestWithQuerry } from "../apiService";
import { createBookingRoute, methods, userBookingsRoute } from "../constants";

const createBooking = async (dto: createBookingDto) => {
  const result = await requestWithBody(createBookingRoute, methods.POST, dto);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const userBooking = async (dto: userBookingsDto): Promise<userBookingPayload> => {
  const result = await requestWithQuerry(userBookingsRoute, methods.GET, { ...dto });
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

export default { createBooking, userBooking };
