import { CreateHotelPayload } from "@/types/dto/apiPayloads/createHotelPayload";
import { getHotelPayload } from "@/types/dto/apiPayloads/getAllHotelsPayload";
import { request, requestWithFormData } from "../apiService";
import { createHotelRoute, deleteHotelRoute, getHotelRoute, methods, updateHotelRoute } from "../constants";

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
  const result = await request(`/gateway/hotels/api/hotels/all`, methods.GET);
  return result.json();
};

const deleteHotel = async (id: number) => {
  const result = await request(deleteHotelRoute + id, methods.DELETE);
  return result.json();
};
const updateHotel = async (id: number, formData: FormData) => {
  // was neeeded to send ultipart data lol
  const result = await requestWithFormData(updateHotelRoute + id, methods.PATCH, formData);
  return result.data;
};

export default { createHotel, getHotel, getAllHotels, deleteHotel, updateHotel };
