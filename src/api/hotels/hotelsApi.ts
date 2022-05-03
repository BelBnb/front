import { CreateHotelPayload } from "@/types/dto/apiPayloads/createHotelPayload";
import { getHotelPayload } from "@/types/dto/apiPayloads/getAllHotelsPayload";
import axios from "axios";
import { createHotelRoute, getAllHotelRoute, getHotelRoute } from "../constants";

const token = localStorage.getItem("token");

const createHotel = async (formData: FormData): Promise<CreateHotelPayload> => {
  // was neeeded to send ultipart data lol
  const result = await axios.post(createHotelRoute, formData, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "multipart/form-data",
    },
  });

  return result.data;
};
const getHotel = async (id: string): Promise<getHotelPayload> => {
  console.log("hotem");

  const result = await fetch(getHotelRoute + id, {
    method: "get",
  });
  return result.json();
};

const getAllHotels = async () => {
  const result = await fetch(getAllHotelRoute, {
    method: "get",
  });
  return result.json();
};

const deleteHotel = async () => {
  const result = await fetch(getAllHotelRoute, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.json();
};
const updateHotel = async (formData: FormData) => {
  // was neeeded to send ultipart data lol
  const result = await axios.post(createHotelRoute, formData, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "multipart/form-data",
    },
  });

  return result.data;
};

export default { createHotel, getHotel, getAllHotels, deleteHotel, updateHotel };
