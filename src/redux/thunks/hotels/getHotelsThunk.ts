import hotelsApi from "@/api/hotels/hotelsApi";
import { Hotel } from "@/types/redux/initStates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPreffix } from "./prefixes";

const getHotelsHandler = async () => {
  const payload = await hotelsApi.getAllHotels();
  const res: Hotel[] = Object.keys(payload.data).map((el) => payload.data[el]);
  return res || [];
};

export default createAsyncThunk(getPreffix, getHotelsHandler);
