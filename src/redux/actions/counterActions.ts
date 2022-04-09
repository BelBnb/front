import { createAction } from "@reduxjs/toolkit"
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../actionTypes/counterTypes"

export const incrementCounter = createAction<number>(INCREMENT_COUNTER);
export const decrementCounter = createAction<number>(DECREMENT_COUNTER);