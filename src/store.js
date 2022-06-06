import { legacy_createStore as createStore} from "redux";
import middleware from './middleware';
import reducer from "./reducers/index";

const store = createStore(reducer, middleware);

export default store;

