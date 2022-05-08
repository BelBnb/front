import { signUp } from "@/api/auth/authApi";
import { SignUpPayload } from "@/types/dto/apiPayloads/auth";
import { SignUpDto } from "@/types/dto/user";
import { userInitState } from "@/types/redux/initStates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpPreffix } from "./prefixes";

const signUpHandler = async (user: SignUpDto) => {
  const payload: SignUpPayload = await signUp(user);

  return payload ?? userInitState;
};

export const signUserUp = createAsyncThunk(signUpPreffix, signUpHandler);
