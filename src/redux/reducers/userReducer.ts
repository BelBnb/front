import { createReducer } from "@reduxjs/toolkit";
import { logUserOut, setUser } from "../actions/userActions";
import { signUserIn } from "../thunks/auth/signInThunk";
import { signUserUp } from "../thunks/auth/signUpThunk";

export type User = {
    email: string,
    id: number
    roles: string[],
    authorized: boolean
}

export const userInitState:User = {
    email:'',
    id:0,
    roles: [],
    authorized: false
}

export const UserReducer = createReducer(userInitState, (bldr)=> {
    bldr.addCase(setUser, (state, action) => {
        return {...state, ...action.payload}
    })
    bldr.addCase(logUserOut, (state, _)=> {
        return {...state, ...userInitState}
    })
    bldr.addCase(signUserIn.fulfilled, (state, action) => {

        return {
            ...state, ...action.payload
        }
    })
    bldr.addCase(signUserUp.fulfilled, (state, action) => {

        return {
            ...state, ...action.payload
        }
    })
})



