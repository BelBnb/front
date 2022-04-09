import { createReducer } from "@reduxjs/toolkit";
import { logUserOut, setUser } from "../actions/userActions";

export type User = {
    email: string,
    id: number
    roles: string[],
    authorized: boolean
}

const initState:User = {
    email:'',
    id:0,
    roles: [],
    authorized: false
}

export const UserReducer = createReducer(initState, (bldr)=> {
    bldr.addCase(setUser, (state, action) => {
        return {...state, ...action.payload}
    })
    bldr.addCase(logUserOut, (state, _)=> {
        return {...state, ...initState}
    })
})



