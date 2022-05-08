import { signIn, getTokenInfo } from "@/api/auth/authApi";
import decode from "@/helpers/jwtDecoder";
import { SignInPayload } from "@/types/dto/apiPayloads/auth";
import { SignInDto } from "@/types/dto/user";
import { User, userInitState } from "@/types/redux/initStates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInPreffix } from "./prefixes";

const signInHandler = async (user: SignInDto) => {
  const payload: SignInPayload = await signIn(user);
  const { token } = payload;

  const { id, email } = decode(token);
  localStorage.setItem("token", token);

  if (payload && id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenPayload: User = await getTokenInfo(id);
    tokenPayload.authorized = true;
    tokenPayload.profilePic = tokenPayload.profilePic || userInitState.profilePic;
    tokenPayload.password = "";
    return tokenPayload;
  }
  return userInitState;
};

export const signUserIn = createAsyncThunk(signInPreffix, signInHandler);
