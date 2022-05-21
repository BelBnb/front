import authApi from "@/api/auth/authApi";
import { SignUpDto } from "@/types/dto/user";
import { userInitState } from "@/types/redux/initStates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { signUpPreffix } from "./prefixes";

const signUpHandler = async (props: { user: SignUpDto; setStatus: (e: boolean) => void }) => {
  const res = await toast.promise(authApi.signUp(props.user), {
    pending: "Otpravlyaem",
    success: "Ezhzhzhi",
    error: {
      render({ data }) {
        return data.message[0] || data.message;
      },
    },
  });
  props.setStatus(!!res);
  return userInitState;
};

export const signUserUp = createAsyncThunk(signUpPreffix, signUpHandler);
