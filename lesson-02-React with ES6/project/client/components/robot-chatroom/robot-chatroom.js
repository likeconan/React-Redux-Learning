import React, {Component} from 'react';
import axios from 'axios';

require('./robot-chatroom.less');

class RobotChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editText: '',
            chats: []
        }

    }

    _onChange = (e) => {
        this.setState({editText: e.target.value});
    }

    _keyPress = (e) => {
        if (e.target.value && e.charCode == 13) {
            var val = e.target.value;

            var myChat = {
                text: val,
                className: 'list-group-item text-right',
                header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490688715&d' +
                        'i=51bfd27f966807dd152a4d71c9f6df10&imgtype=jpg&er=1&src=http%3A%2F%2Fimg5q.duita' +
                        'ng.com%2Fuploads%2Fitem%2F201503%2F07%2F20150307121820_TkwPE.jpeg'
            }
            this.setState({
                ...this.state,
                editText: '',
                chats: this
                    .state
                    .chats
                    .concat(myChat)
            })

            axios.get('https://api.api.ai/api/query', {
                params: {
                    v: 20150910,
                    query: val,
                    lang: 'en',
                    sessionId: 'e1358954-8738-4ce5-b4ed-4dc94b8a68c8',
                    timezone: new Date()
                },
                headers: {
                    'Authorization': 'Bearer 3e6ff422acc74c45bc0069f5d0412a21'
                }
            }).then((res) => {
                var robotChat = {
                    text: res.data.result.fulfillment.speech,
                    className: 'list-group-item list-group-item-success',
                    header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=149009507072' +
                            '7&di=fbfb9dcd75efd6dd496ee7133f0454da&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.co' +
                            'm%2Fforum%2Fw%253D580%2Fsign%3Dc1ac4eaa369b033b2c88fcd225cf3620%2F7cd98d1001e939' +
                            '0134b9de9079ec54e737d196e0.jpg'
                }

                this.setState({
                    ...this.state,
                    chats: this
                        .state
                        .chats
                        .concat(robotChat)
                })
            }).catch(res => {
                console.log(res);
            })
        }
    }

    render() {
        const chatsEle = this
            .state
            .chats
            .map((val, key) => {
                return (
                    <li key={key} className={val.className}>
                        <span>
                            {val.text}
                        </span>
                        <img className='header' src={val.header}/>
                    </li>
                )
            })
        return (
            <div>
                <h1 className='text-center'>Welcome to Robot Chat Room</h1>
                <div className='chat-con'>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="What do you want?"
                            onKeyPress={this._keyPress}
                            value={this.state.editText}
                            onChange={this._onChange}/>
                    </div>
                    <ul className="list-group chats">
                        {chatsEle}
                    </ul>
                </div>
            </div>
        );
    }
}

export default RobotChatRoom;