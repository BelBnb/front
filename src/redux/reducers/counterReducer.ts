import createAction, { Action } from "../actions/createActions";
import createReducer, { HandlersType } from "./makeReducer";

export type CounterStateType = {
    counter: number
}

const INCREMENT_COUNTER = "INCREMENT_COUNTER"; 
const DECREMENT_COUNTER = "DECREMENT_COUNTER"; 

const CounterState: CounterStateType = {
    counter: 0
} 

// const action: Action<CounterStateType> = {
//     type:INCREMENT_COUNTER,
//     payload: 
// }


export const increment = (payload:number) => createAction(INCREMENT_COUNTER, payload);

const handlers: HandlersType<CounterStateType, CounterStateType, CounterStateType> = {
    [INCREMENT_COUNTER]: (state, action)=> {
        return {...state, ...action.payload}
    },
    default: (state) => state
}


export default createReducer<CounterStateType, CounterStateType, CounterStateType>(CounterState, handlers)