import React, {Component} from 'react';

require('./robot-chatroom.less');

class RobotChatRoom extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1 className='text-center'>Welcome to Robot Chat Room</h1>
            </div>
        );
    }
}

export default RobotChatRoom;