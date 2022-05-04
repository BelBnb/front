import { getHotelPayload } from "@/types/dto/apiPayloads/getAllHotelsPayload";
import { createReducer } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { createHotel, deleteHotel, updateHotel } from "../actions/hotelsActions";
import getHotelsThunk from "../thunks/hotels/getHotelsThunk";

export type Hotel = getHotelPayload;

export const hotelsInitState: Hotel[] = [];

export const HotelsReducer = createReducer(hotelsInitState, (bldr) => {
  bldr.addCase(createHotel, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(deleteHotel, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(updateHotel, (state, _) => ({ ...state, ...hotelsInitState }));
  bldr.addCase(getHotelsThunk.fulfilled, (state, action) => {
    console.log(`action`, action.payload);
    return action.payload;
  });
});
