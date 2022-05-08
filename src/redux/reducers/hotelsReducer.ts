import { hotelsInitState } from "@/types/redux/initStates";
import { createReducer } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { createHotel, deleteHotel, updateHotel } from "../actions/hotelsActions";
import getHotelsThunk from "../thunks/hotels/getHotelsThunk";

export const HotelsReducer = createReducer(hotelsInitState, (bldr) => {
  bldr.addCase(createHotel, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(deleteHotel, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(updateHotel, (state, _) => ({ ...state, ...hotelsInitState }));
  bldr.addCase(getHotelsThunk.fulfilled, (state, action) => action.payload);
});
