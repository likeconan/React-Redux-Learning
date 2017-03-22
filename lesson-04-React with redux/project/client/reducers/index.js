import {combineReducers} from 'redux';

import userStore from './user.reducer';
import tweetStore from './tweet.reducer';

export default combineReducers({
    userStore,
    tweetStore,
});