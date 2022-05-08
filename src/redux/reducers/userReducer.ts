import { createReducer } from "@reduxjs/toolkit";
import { logUserOut, setUser } from "../actions/userActions";
import { signUserIn } from "../thunks/auth/signInThunk";
import { signUserUp } from "../thunks/auth/signUpThunk";
import { SexEnum } from "@/common/sex.enum";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: string[];
  profilePic: string;
  authorized: boolean;
  birthDate: Date;
  sex: SexEnum;
};

export const userInitState: User = {
  email: "",
  firstName: "Kirill",
  lastName: "Kvit",
  id: "6780e2d8-8443-4eab-8c35-e149c75ee1d0",
  roles: [],
  authorized: true,
  sex: SexEnum.Female,
  birthDate: new Date("2001-01-01"),
  profilePic:
    "https://res.cloudinary.com/dv1m78v3d/image/upload/c_thumb,w_200,g_face/v1650789446/ukrgenubujqt86buzrsk.jpg",
};

export const UserReducer = createReducer(userInitState, (bldr) => {
  bldr.addCase(setUser, (state, action) => ({ ...state, ...action.payload }));
  bldr.addCase(logUserOut, (state, _) => ({ ...state, ...userInitState }));
  bldr.addCase(signUserIn.fulfilled, (state, action) => ({
    ...state,
    ...action.payload,
  }));
  bldr.addCase(signUserUp.fulfilled, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
