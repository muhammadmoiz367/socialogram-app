import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../actionConstants'

const initialState={
    loading: false,
    errors: {}
}
const uiReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOADING_UI:
            console.log('loading ui')
            return{
                ...state,
                loading: true
            }
        case SET_ERRORS:
            console.log('set errors')
            return{
                ...state,
                loading: false,
                errors: action.errors
            }
        case CLEAR_ERRORS:
            console.log('clear errors')
            return {
                ...state,
                loading: false,
                errors: {}
            }
        default:
            return state
    }
}

export default uiReducer