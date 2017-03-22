import React, {Component} from 'react';
import axios from 'axios';

import PostTweet from '../post-tweet/post-tweet';
import ChatsList from '../chats-list/chats-list';

require('./robot-chatroom.less');

class RobotChatRoom extends Component {
    render() {
        return (
            <div>
                <h1 className='text-center'>Welcome to Robot Chat Room</h1>
                <div className='chat-con'>
                    <PostTweet/>
                    <ChatsList/>
                </div>
            </div>
        );
    }
}

export default RobotChatRoom;