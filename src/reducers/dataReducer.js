import { GET_POSTS, CREATE_POST, GET_SPECIFIC_POST, CREATE_NEW_COMMENT } from "../actionConstants"

const initialState={
    posts: [],
    specificPost: {},
    comments: [],
    likes: [],
}

const dataReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                posts: action.data
            }
        case CREATE_POST:
            const {posts}=state
            return{
                ...state,
                posts: posts.push(action.data)
            }
        case GET_SPECIFIC_POST:
            return{
                ...state,
                specificPost: action.data
            }
        case CREATE_NEW_COMMENT:
            const {comments}=state
            return{
                ...state,
                comments: comments.push(action.data)
            }
        default:
            return state
    }
}

export default dataReducer