import {SET_USER, SET_AUTHENTICATED_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATED, SIGNOUT_ERROR, LIKE_POST, UNLIKE_POST, GET_SPECIFIC_USER, MARK_NOTIFICATIONS_READ} from '../actionConstants'

const initialState={
    authenticated: false,
    specificUser: {},
    credentials: {},
    likes: [],
    notifications: []
}

export default function authUserReducer(state=initialState, action){
    switch(action.type){
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            }
        case SET_USER:
            return{
                ...state,
                credentials: action.data
            }
        case SET_AUTHENTICATED_USER:
            return{
                ...state,
                credentials: action.data.credentials,
                likes: action.data.likes,
                notifications: action.data.notifications
            }
        case SIGNOUT_ERROR:
            return{
                ...state,
                errors: action.err
            }
        case LIKE_POST:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.data.postId
                    }
                ]
            }
        case UNLIKE_POST:
            return{
                ...state,
                likes: state.likes.filter((like)=>like.postId !== action.data.postId)
            }
        case GET_SPECIFIC_USER:
            return{
                ...state,
                specificUser: action.data   
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((not) => (not.read = true));
            return {
                ...state
            };
        default:
            return state
    }
}