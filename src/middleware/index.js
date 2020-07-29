import {applyMiddleware} from 'redux'
import {getFirebase} from 'react-redux-firebase'
import {getFirestore} from 'redux-firestore'
import thunk from 'redux-thunk'

const Middleware=applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))

export default Middleware