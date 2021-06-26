import { combineReducers, createStore } from "redux";
import calculator from "./reducers";

export const rootReducer = combineReducers({
    calculator
});

export type AllState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
