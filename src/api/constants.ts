const gatewayPreffix = "/gateway";
const apiPreffix = "/api";

export const signInRoute = `${gatewayPreffix}/auth/sign-in`;
export const getTokenInfoRoute = `${gatewayPreffix}/auth/user`;
export const signUpRoute = `${gatewayPreffix}/auth/sign-up`;

const hotelPreffix = "/hotels";
export const createHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/create`;
export const updateHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;
export const deleteHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;
export const getAllHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/all`;
export const getHotelRoute = `${gatewayPreffix + hotelPreffix + apiPreffix + hotelPreffix}/`;
