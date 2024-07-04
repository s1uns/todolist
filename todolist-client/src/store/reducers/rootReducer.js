import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import filterReducer from "./queryReducer";
import userReducer from "./userReducer";
import toastsReducer from "./toastsReducer";

const rootReducer = combineReducers({
    todos: todosReducer,
    query: filterReducer,
    user: userReducer,
    toasts: toastsReducer
});

export default rootReducer;
