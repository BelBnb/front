import { Action } from "../actions/createActions";

export type HandlersType<IS, PT, E> = {
    [key:string]: (state: IS, action: Action<E>) => PT; 
    default: (state: IS, action: Action<E>) => PT 
}

function    createReducer<IS, PT, E>(initState:IS, handlers: HandlersType<IS, PT, E>){
    return function reducer(state = initState, action: Action<E>){
        if(handlers[action.type]){
            return handlers[action.type](state, action)
        }
        return handlers.default;
    }
}

export default createReducer;