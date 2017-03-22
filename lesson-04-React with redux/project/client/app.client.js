import React from 'react'
import ReactDOM from 'react-dom';
import RobotChatRoom from './components/robot-chatroom/robot-chatroom';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
    <RobotChatRoom/>
</Provider>, document.getElementById('root'));