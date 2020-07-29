import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../actionConstants'
import axios from 'axios'

export const loginUser=(userData, history)=>(dispatch)=>{
        dispatch({ type: LOADING_UI })
        axios.post('/login',userData)
          .then((res)=>{
            console.log(res.data)
            localStorage.setItem('FBIDToken',`Bearer ${res.data.token}`)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
          })
          .catch((err)=>{
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                errors: err.response.data
            })

          })

}

export const getUserData=()=>(dispatch)=>{
        axios.get('./users')
        .then(res=>{
            dispatch({
                type: SET_USER,
                data: res.data
            })
            .catch(err=>{
                console.log(err)
            })
        })

}
