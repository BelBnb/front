import hotelsApi from "@/api/hotels/hotelsApi";
import { Hotel } from "@/redux/reducers/hotelsReducer";
import { Paginator } from "@/types/dto/pagination/paginator";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPreffix } from "./prefixes";

const getHotelsHandler = async () => {
  const payload: Paginator<{ [key: string]: Hotel }> = await hotelsApi.getAllHotels();
  const res: Hotel[] = Object.keys(payload.data).map((el) => payload.data[el]);
  console.log(`res`, res);
  return res || [];
};

export default createAsyncThunk(getPreffix, getHotelsHandler);
