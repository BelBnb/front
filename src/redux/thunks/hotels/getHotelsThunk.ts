import hotelsApi from "@/api/hotels/hotelsApi";
import { userInitState } from "@/redux/reducers/userReducer";
import { CreateHotelPayload } from "@/types/dto/apiPayloads/createHotelPayload";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPreffix } from "./prefixes";

const getHotelsHandler = async () => {
  const payload: CreateHotelPayload = await hotelsApi.getAllHotels();

  return payload ?? userInitState;
};

export default createAsyncThunk(getPreffix, getHotelsHandler);
