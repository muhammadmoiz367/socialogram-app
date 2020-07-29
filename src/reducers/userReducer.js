import {SET_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATED} from '../actionConstants'

const initialState={
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return{
                authenticated: true,
                ...action.data
            }
        default:
            return state
    }
}

export default userReducer