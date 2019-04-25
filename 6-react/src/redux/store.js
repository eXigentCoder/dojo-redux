import rootReducer from "./root-reducer";
import { createStore, compose } from "redux";

const windowIfDefined = typeof window === "undefined" ? null : window;
const composeEnhancer =
  windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer());
export default store;
