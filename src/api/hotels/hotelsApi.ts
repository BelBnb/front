import { CreateHotelPayload } from "@/types/dto/apiPayloads/createHotelPayload";
import { getHotelPayload } from "@/types/dto/apiPayloads/getAllHotelsPayload";
import { request, requestWithFormData, requestWithQuerry } from "../apiService";
import {
  createHotelRoute,
  deleteHotelRoute,
  getAllHotelRoute,
  getFilteredHotelRoute,
  getHotelRoute,
  methods,
  updateHotelRoute,
} from "../constants";

const createHotel = async (formData: FormData): Promise<CreateHotelPayload> => {
  const result = await requestWithFormData(createHotelRoute, methods.POST, formData);

  return result.data;
};
const getHotel = async (id: string): Promise<getHotelPayload> => {
  const result = await request(getHotelRoute + id, methods.GET);
  return result.json();
};

const getAllHotels = async () => {
  const token = localStorage.getItem("token");
  const result = await request(getAllHotelRoute, methods.GET);
  return result.json();
};

interface HotelsFilter {
  city: string;
  name: string;
  priceLT: number;
  priceGT: number;

  limit: number;
  offset: number;
}

const getFilteredHotels = async (data: HotelsFilter) => {
  const result = await requestWithQuerry(getFilteredHotelRoute, methods.GET, data);
  return result.json();
};

const deleteHotel = async (id: string) => {
  const result = await request(deleteHotelRoute + id, methods.DELETE);
  return result;
};
const updateHotel = async (id: string, formData: FormData) => {
  // was neeeded to send ultipart data lol
  const result = await requestWithFormData(updateHotelRoute + id, methods.PUT, formData);
  return result.data;
};

export default { createHotel, getHotel, getAllHotels, deleteHotel, updateHotel, getFilteredHotels };
