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
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const getAllHotels = async () => {
  const token = localStorage.getItem("token");
  const result = await request(getAllHotelRoute, methods.GET);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
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
  return new Promise((res, rej) => {
    result.json().then((dd) => {
      if (dd.error) rej(dd);
      res(dd);
    });
  });
};

const deleteHotel = async (id: string) => {
  const result = await request(deleteHotelRoute + id, methods.DELETE);
  return result;
};
const updateHotel = async (id: string, formData: FormData) => {
  // was neeeded to send ultipart data lol
  const result = await requestWithFormData(updateHotelRoute + id, methods.PATCH, formData);
  return result.data;
};

export default { createHotel, getHotel, getAllHotels, deleteHotel, updateHotel, getFilteredHotels };
