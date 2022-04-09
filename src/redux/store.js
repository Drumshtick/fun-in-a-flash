import { createStore, combineReducers } from 'redux';
// import reducers here
import keyboardReducer from './reducers/keyboard';
const rootReducer = combineReducers({
    // Declare individual reducers here
    // profile: profileReducer,
    keyboard: keyboardReducer
});
export const store = createStore(
    rootReducer,
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
