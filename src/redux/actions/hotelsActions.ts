import { CreateHotelPayload } from "@/types/dto/apiPayloads/createHotelPayload";
import { getAllHotelsPayload } from "@/types/dto/apiPayloads/getAllHotelsPayload";
import { createAction } from "@reduxjs/toolkit";
import { CREATE_HOTEL, GET_HOTELS, DELETE_HOTEL, PATCH_HOTEL } from "../actionTypes/hotelsTypes";
import { Hotels } from "../reducers/hotelsReducer";

export const createHotel = createAction<CreateHotelPayload>(CREATE_HOTEL);
export const getHotels = createAction<getAllHotelsPayload[]>(GET_HOTELS);
export const deleteHotel = createAction<Hotels>(DELETE_HOTEL);
export const updateHotel = createAction<Hotels>(PATCH_HOTEL);
