import { GET_POSTS } from "../actionConstants"

const dataReducer=(state=[],action)=>{
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                posts: action.data
            }
        default:
            return state
    }
}

export default dataReducer