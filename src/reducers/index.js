import {combineReducers} from 'redux'
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase'
import dataReducer from './dataReducer'
import uiReducer from './uiReducer'
import authUserReducer from './authUserReducer'

export default combineReducers({
    data: dataReducer,
    user: authUserReducer,
    ui: uiReducer,
    firebase:firebaseReducer,
    firestore: firestoreReducer,
})

