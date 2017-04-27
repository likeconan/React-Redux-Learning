import {combineReducers} from 'redux';

import userReducer from './user.reducer';
import tweetReducer from './tweet.reducer';

export default combineReducers({
    tweetReducer,
    userReducer,
});