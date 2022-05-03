import { getHotelPayload } from "@/types/dto/apiPayloads/getAllHotelsPayload";
import { createReducer } from "@reduxjs/toolkit";
import { createHotel, getHotels, deleteHotel, updateHotel } from "../actions/hotelsActions";

export type Hotel = getHotelPayload;

export const hotelsInitState: Hotel[] = [];

export const HotelsReducer = createReducer(hotelsInitState, (bldr) => {
  bldr.addCase(createHotel, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(getHotels, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(deleteHotel, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(updateHotel, (state, _) => ({ ...state, ...hotelsInitState }));
});
