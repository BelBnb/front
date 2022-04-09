import { createReducer } from "@reduxjs/toolkit";
import { decrementCounter, incrementCounter } from "../actions/counterActions";

type counterType = {
    counter: number
}
const initState = {
    counter: 0
}




export const counterReducer = createReducer(initState, (bldr)=> {
    bldr.addCase(incrementCounter, (state, action) => {
        state.counter += action.payload
    })
    bldr.addCase(decrementCounter, (state, action)=> {
        state.counter -= action.payload
    })
})



