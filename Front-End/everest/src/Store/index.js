import { compose, createStore, applyMiddleware } from "redux"
import allReducers from "./Reducers/index"
import thunk from "redux-thunk"


/*Use with the Redus-Devtools extension for your browser to see the current 
state in real time! */
const composeEnhancers = process.env.NODE_ENV === "development" 
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
: compose;

const store = createStore(
    allReducers, 
    composeEnhancers(
        applyMiddleware(thunk)
));

export default store;