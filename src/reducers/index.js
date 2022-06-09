import { combineReducers } from "redux";
import authedUser from "./authedUser";
import userReducer from "./user";
import questionReducer from "./questions";
import locationReducer from "./location";

export default combineReducers({
    authedUser,
    users: userReducer,
    questions: questionReducer,
    location: locationReducer
})