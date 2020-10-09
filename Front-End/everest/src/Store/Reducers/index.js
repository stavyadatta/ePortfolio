import { combineReducers } from "redux";

import authReducer from "./authReducer";
import projectReducer from "./projectReducer";


const allReducers = combineReducers({
    auth: authReducer,
    project: projectReducer
});

export default allReducers;