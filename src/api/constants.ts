// methods
export const enum methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  PUT = "PUT",
  PATCH = "PATCH",
}

// routes
const gatewayPreffix = "/gateway";
const apiPreffix = "/api";

export const signInRoute = `${gatewayPreffix}/auth/auth/login`;
export const getTokenInfoRoute = `${gatewayPreffix}/users/api/users/`;
export const signUpRoute = `${gatewayPreffix}/auth/sign-up`;

const hotelPreffix = "/hotels";
export const createHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/create`;
export const updateHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;
export const deleteHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;
export const getAllHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/all`;
export const getFilteredHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/filtered`;
export const getHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;

// feedbacks
const feedbackPreffix = "/feedback";
export const getFeedbackFor = (id: string) =>
  `${gatewayPreffix + feedbackPreffix + apiPreffix + feedbackPreffix}/for_entity/${id}`;
export const getMyFeedbackFor = (itemId: string, myId: string) =>
  `${gatewayPreffix + feedbackPreffix + apiPreffix + feedbackPreffix}/my_feedback/${itemId}?my_id=${myId}`;
export const deleteFeedback = (itemId: string) =>
  `${gatewayPreffix + feedbackPreffix + apiPreffix + feedbackPreffix}/${itemId}`;
export const updateFeedback = (itemId: string) =>
  `${gatewayPreffix + feedbackPreffix + apiPreffix + feedbackPreffix}/${itemId}`;

export const createFeedback = `${gatewayPreffix + feedbackPreffix + apiPreffix + feedbackPreffix}/create`;

// booking
const bookingPreffix = "/booking";

export const createBookingRoute = `${gatewayPreffix + bookingPreffix + apiPreffix + bookingPreffix}/create`;
export const userBookingsRoute = `${gatewayPreffix + bookingPreffix + apiPreffix + bookingPreffix}/user_bookings`;
export const getBookingsFor = (hotelId: string) =>
  `${gatewayPreffix + bookingPreffix + apiPreffix + bookingPreffix}/hotel_bookings/${hotelId}`;
export const updateBooking = (itemId: string) =>
  `${gatewayPreffix + bookingPreffix + apiPreffix + bookingPreffix}/${itemId}`;

// user
const usersPreffix = "/users";
export const getUserById = (userId: string) => `${gatewayPreffix + usersPreffix + apiPreffix + usersPreffix}/${userId}`;
export const updateUserRoute = (userId: string) =>
  `${gatewayPreffix + usersPreffix + apiPreffix + usersPreffix}/${userId}`;

//neighbours
const neighboursPreffix = "/neighbours";
export const allNeighboursRoute = `${gatewayPreffix + neighboursPreffix + apiPreffix + neighboursPreffix}/all`;
export const meNeighbourRoute = `${gatewayPreffix + neighboursPreffix + apiPreffix + neighboursPreffix}/my`;
export const removeNeighbourRoute = (id) =>
  `${gatewayPreffix + neighboursPreffix + apiPreffix + neighboursPreffix}/${id}`;
export const createNeighbourRoute = `${gatewayPreffix + neighboursPreffix + apiPreffix + neighboursPreffix}/create`;
