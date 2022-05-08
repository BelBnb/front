/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { userInitState } from "@/types/redux/initStates";
import { createReducer } from "@reduxjs/toolkit";
import { logUserOut, setUser } from "../actions/userActions";
import { signUserIn } from "../thunks/auth/signInThunk";
import { signUserUp } from "../thunks/auth/signUpThunk";

const setStorage = (state: any, action: any) => {
  const newState = { ...state, ...action.payload };
  localStorage.setItem("user", JSON.stringify(newState));
  return newState;
};

const storageUser = localStorage.getItem("user");
const initState = storageUser ? JSON.parse(storageUser) : userInitState;
export const UserReducer = createReducer(initState, (bldr) => {
  bldr.addCase(setUser, (state, action) => setStorage(state, action));
  bldr.addCase(logUserOut, (state, _) => setStorage(state, { payload: userInitState }));
  bldr.addCase(signUserIn.fulfilled, (state, action) => setStorage(state, action));
  bldr.addCase(signUserUp.fulfilled, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
