// methods
export const enum methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
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
export const getHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;
