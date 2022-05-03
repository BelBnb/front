const apiPrefix = "/api";

export const signInRoute = `${apiPrefix}/auth/sign-in`;
export const getTokenInfoRoute = `${apiPrefix}/auth/user`;
export const signUpRoute = `${apiPrefix}/auth/sign-up`;

const hotelPreffix = "/hotels";
export const createHotelRoute = `${hotelPreffix + apiPrefix}/create`;
export const updateHotelRoute = `${hotelPreffix + apiPrefix}/`;
export const deleteHotelRoute = `${hotelPreffix + apiPrefix}/`;
export const getAllHotelRoute = `${hotelPreffix + apiPrefix}/all`;
export const getHotelRoute = `${hotelPreffix + apiPrefix}/`;
