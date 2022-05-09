import { Paginator } from "../../pagination/paginator";
import { BookingEntityFilled } from "@/common/types/Booking";

export type userBookingPayload = Paginator<BookingEntityFilled[]>;
