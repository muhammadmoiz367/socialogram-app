import { GET_POSTS, CREATE_POST, GET_SPECIFIC_POST, CREATE_NEW_COMMENT, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, DELETE_COMMENT } from "../actionConstants"

const initialState={
    posts: [],
    specificPost: {},
    comments: [],
    likes: [],
    loading: false
}

const dataReducer=(state=initialState, action)=>{
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case GET_POSTS:
            return{
                ...state,
                posts: action.data
            }
        case CREATE_POST:
            const {posts}=state
            return{
                ...state,
                posts: [...state.posts, action.data]
            }
        case GET_SPECIFIC_POST:
            return{
                ...state,
                specificPost: action.data
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index=state.posts.findIndex((post)=> post.postId === action.data.postId);
            state.posts[index]=action.data
            return{
                ...state
            }
        case CREATE_NEW_COMMENT:
        case DELETE_POST:
        case DELETE_COMMENT:
        default:
            return state
    }
}

export default dataReducer