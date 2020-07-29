import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore, compose} from 'redux'
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";
import {Provider, useSelector} from 'react-redux'
import firebase from "firebase/app";
import firebaseConfig from "./firebase/firebase";
//import store from './store'
import Reducer from './reducers'
import Middleware from './middleware/index'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const profileSpecificProps={
  userProfile:'users',
  useFirestoreForProfile:true,
  enableRedirectHandling: false,
  resetBeforeLogin:false
}

const store = createStore(
  Reducer,
  compose(
    Middleware,
    reduxFirestore(firebase,firebaseConfig)
  )
);


const rrfProps = {
  firebase,
  config: firebaseConfig,
  config:profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance
};


ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

/*
function AuthIsLoaded({children}){
  const auth=useSelector(state => state.firebase.auth)
  if(!isLoaded(auth))
      return <div>Loading screen...</div>
  return children
}
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
