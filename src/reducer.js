export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const DATA_RECEIVED = "DATA_RECEIVED"
export const SHOW_ANS = "SHOW_ANS"
export const REMOVE_SHOW_START = "REMOVE_SHOW_START"
export const RESET_GAME = "RESET_GAME"

export const initialState = {
    showStart: true,
    category: 17,
    loading: true,
    data: [],
    showAns: false,
    correctAns: 0,
    newClass: ''
}

export default function reducer(state, action) {
    switch (action.type) {
        case UPDATE_CATEGORY: 
            return {...state, category: action.payload}
        case REMOVE_SHOW_START: 
            return {...state, showStart: false}
        case DATA_RECEIVED: 
            return {...state, loading: false, data: action.payload}
        case SHOW_ANS:
            return {...state, data: action.payload.data, showAns: true, newClass: 'inert', correctAns: action.payload.count}
        case RESET_GAME: 
            return initialState
        default: 
            return state
    }
}