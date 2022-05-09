import { getTokenInfo } from "@/api/auth/authApi";
import decode from "@/helpers/jwtDecoder";
import { User, userInitState } from "@/types/redux/initStates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenPreffix } from "./prefixes";

const getTokenInfoHandler = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return userInitState;
  }
  const { id } = decode(token);

  if (id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenPayload: User = await getTokenInfo(id);
    tokenPayload.authorized = true;
    tokenPayload.profilePic = tokenPayload.profilePic || userInitState.profilePic;
    tokenPayload.password = "";
    console.log(tokenPayload);
    return tokenPayload;
  }
  console.log("Вышел преждевременно");
  return userInitState;
};

export const getTokenInfoThunk = createAsyncThunk(getTokenPreffix, getTokenInfoHandler);
