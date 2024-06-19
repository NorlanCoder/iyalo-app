import { combineReducers } from "redux";
import {appSlice} from "./reducers/appReducer.js";


const rootReducer = combineReducers({
    app: appSlice,
});

export default rootReducer;