import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import ClipsReducer from './reducerClips';

export default combineReducers({
    authenticationReducer,
    clips: ClipsReducer
})