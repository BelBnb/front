import authApi from "@/api/auth/authApi";
import { SignUpPayload } from "@/types/dto/apiPayloads/auth";
import { SignUpDto } from "@/types/dto/user";
import { userInitState } from "@/types/redux/initStates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpPreffix } from "./prefixes";

const signUpHandler = async (user: SignUpDto) => {
  const payload: SignUpPayload = await authApi.signUp(user);
  return t ?? userInitState;
};

export const signUserUp = createAsyncThunk(signUpPreffix, signUpHandler);
