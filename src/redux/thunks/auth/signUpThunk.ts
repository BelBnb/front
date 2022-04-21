import authApi from "@/api/auth/authApi";
import { userInitState } from "@/redux/reducers/userReducer";
import { SignUpPayload } from "@/types/dto/apiPayloads/auth";
import { SignUpDto } from "@/types/dto/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpPreffix } from "./prefixes";

const signUpHandler = async (user: SignUpDto) => {
    const payload: SignUpPayload = await authApi.signUp(user);
    
    return payload?? userInitState;
};



export const signUserUp = createAsyncThunk(signUpPreffix, signUpHandler )