import hotelsApi from "@/api/hotels/hotelsApi";
import { userInitState } from "@/redux/reducers/userReducer";
import { CreateHotelPayload } from "@/types/dto/apiPayloads/createHotelPayload";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPreffix } from "./prefixes";

const createHotelHandler = async (createHotelFormData: FormData) => {
  const payload: CreateHotelPayload = await hotelsApi.createHotel(createHotelFormData);

  return payload ?? userInitState;
};

export default createAsyncThunk(createPreffix, createHotelHandler);
