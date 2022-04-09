export type Action<E> = {
    type: string,
    payload: E
}

function createAction<E>(type:string, payload:E){
    return {
        type,
        payload
    }
}


export default createAction;