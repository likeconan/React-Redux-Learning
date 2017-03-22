import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect((store) => {
    return {tweets: store.tweetStore.tweets}
})

class ChatsList extends Component {
    render() {
        const chatsEle = this
            .props
            .tweets
            .map((val, key) => {
                return (
                    <li key={key} className={val.className}>
                        <span>
                            {val.text}
                        </span>
                        <div>
                            <img className='header' src={val.user.header}/>
                            <span>{val.user.username}</span>
                        </div>
                    </li>
                )
            });
        return (
            <div>
                <ul className="list-group chats">
                    {chatsEle}
                </ul>
            </div>
        );
    }
}

export default ChatsList;