import { GET_POSTS, CREATE_POST, GET_SPECIFIC_POST, CREATE_NEW_COMMENT, LIKE_POST, UNLIKE_POST, LOADING_DATA } from "../actionConstants"

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
        case LIKE_POST:
        case UNLIKE_POST:
            let index=state.posts.findIndex((post)=> post.postId === action.data.postId);
            state.posts[index]=action.data
            return{
                ...state
            }
        default:
            return state
    }
}

export default dataReducer