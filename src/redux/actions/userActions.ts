import { createAction } from "@reduxjs/toolkit"
import { LOG_OUT, SET_USER } from "../actionTypes/userTypes";
import { User } from "../reducers/userReducer";

export const setUser = createAction<User>(SET_USER);
export const logUserOut = createAction(LOG_OUT);