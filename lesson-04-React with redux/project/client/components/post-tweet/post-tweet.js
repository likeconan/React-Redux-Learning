import React, {Component} from 'react';
import TextField from '../TextField/TextField';
import {editText, post, reply} from '../../actions/tweet.action';
import {getUser} from '../../actions/user.action';
import {connect} from 'react-redux';

@connect((store) => {
    return {editText: store.tweetStore.editText, user: store.userStore.user}
})

class PostTweet extends Component {

    _onChange = (val) => {
        this
            .props
            .dispatch(editText(val));
    }

    _keyPress = (val) => {
        this
            .props
            .dispatch(post({text: val, className: 'list-group-item flex-right', user: this.props.user}));
        this
            .props
            .dispatch(reply(val));
    }

    componentWillMount() {
        this
            .props
            .dispatch(getUser())
    }

    render() {
        return (
            <div>
                <TextField
                    onChange={this._onChange}
                    val={this.props.editText}
                    placeholder='What do you want?'
                    onKeyPress={this._keyPress}/>
            </div>
        );
    }
}

export default PostTweet;