import authApi from "@/api/auth/authApi";
import { User, userInitState } from "@/redux/reducers/userReducer";
import { SignInPayload } from "@/types/dto/apiPayloads/auth";
import { SignInDto } from "@/types/dto/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInPreffix } from "./prefixes";

const signInHandler = async (user: SignInDto) => {
    const payload: SignInPayload = await authApi.signIn(user);
    localStorage.setItem("token",payload.token);

    if(payload){
        const tokenPayload = await authApi.getTokenInfo(payload.token);
        return tokenPayload;
    }
    return userInitState;
};



export const signUserUp = createAsyncThunk(signInPreffix, signInHandler )