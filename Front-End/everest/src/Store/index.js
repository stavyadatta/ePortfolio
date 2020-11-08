import { compose, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { getFirebase } from "react-redux-firebase"
import { createFirestoreInstance, getFirestore } from 'redux-firestore'

import firebase from "../Firebase"
import rootReducer from "./Reducers/index"


/*Use with the Redux-Devtools extension for your browser to see the current 
state in real time! */
const composeEnhancers = process.env.NODE_ENV === "development"
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
: compose;


const store = createStore(
    rootReducer, 
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}))  )
);

const rrfconfig={
    userProfile: 'users',
    useFirestoreForProfile: true
}

export const rrfprops={
    firebase,
    config:rrfconfig,
    dispatch:store.dispatch,
    createFirestoreInstance
}



export default store;