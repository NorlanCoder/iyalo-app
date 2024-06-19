import { combineReducers } from "redux";
// import {appSlice} from "./reducers/appReducer.js";
import appReducer from "./reducers/appReducer";


const rootReducer = combineReducers({
    appReducer: appReducer,
});

export default rootReducer;