import {createStore, compose} from 'redux'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";
import firebaseConfig from "./firebase/firebase";
import firebase from "firebase/app";
import Reducer from './reducers'
import Middleware from './middleware/index'

const store = createStore(
    Reducer,
    compose(
      Middleware,
      reduxFirestore(firebase,firebaseConfig)
    )
  );

export default store