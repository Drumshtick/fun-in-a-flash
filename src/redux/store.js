import { createStore, combineReducers } from 'redux';
// import reducers here
const rootReducer = combineReducers({
    // Declare individual reducers here
    // profile: profileReducer,
});
export const store = createStore(
    rootReducer,
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
